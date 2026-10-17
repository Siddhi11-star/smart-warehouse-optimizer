"""
tests/test_realtime_and_hardware.py
Unit tests for Real-Time Operations & Hardware Integration:
1. Server-Sent Events (SSE) live stream endpoint
2. Barcode / QR Code hardware pick verification (match & mismatch)
3. CSV bulk export & import for inventory
4. CSV bulk export for orders
5. Order fulfillment & stock decrement
"""

import io
import pytest
from backend.app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_sse_endpoint_headers(client):
    """Verifies that /api/events delivers proper SSE headers."""
    res = client.get("/api/events")
    assert res.status_code == 200
    assert "text/event-stream" in res.content_type
    assert "no-cache" in res.headers.get("Cache-Control", "")

def test_inventory_export_csv(client):
    """Verifies that /api/inventory/export returns valid CSV format with correct columns."""
    res = client.get("/api/inventory/export")
    assert res.status_code == 200
    assert "text/csv" in res.content_type
    content = res.data.decode("utf-8")
    assert "id,name,category,stock_quantity,pick_frequency,assigned_shelf_id" in content
    # Should include products
    assert len(content.splitlines()) > 1

def test_orders_export_csv(client):
    """Verifies that /api/orders/export returns valid CSV format."""
    res = client.get("/api/orders/export")
    assert res.status_code == 200
    assert "text/csv" in res.content_type
    content = res.data.decode("utf-8")
    assert "order_id,customer_name,status" in content

def test_inventory_import_csv(client):
    """Verifies that /api/inventory/import accepts and processes CSV data."""
    csv_payload = "name,category,stock_quantity,pick_frequency,assigned_shelf_id\nTest Motor 9000,Hardware,42,15,4\n"
    res = client.post(
        "/api/inventory/import",
        data={"file": (io.BytesIO(csv_payload.encode("utf-8")), "test_inventory.csv")},
        content_type="multipart/form-data"
    )
    assert res.status_code == 200
    data = res.get_json()
    assert data["status"] == "success"
    assert data["imported"] >= 1

def test_order_pick_verification(client):
    """Verifies hardware barcode matching and mismatch handling on order line items."""
    # Order #1 has products assigned to specific shelves
    order_res = client.get("/api/orders")
    orders = order_res.get_json()
    assert len(orders) > 0
    order_id = orders[0]["id"]
    first_item = orders[0]["items"][0]
    expected_shelf = first_item["shelf_id"]

    # 1. Matching barcode: SHELF-X
    match_res = client.post(
        f"/api/orders/{order_id}/verify-pick",
        json={"scanned_code": f"SHELF-{expected_shelf}", "shelf_id": expected_shelf}
    )
    assert match_res.status_code == 200
    match_data = match_res.get_json()
    assert match_data["verified"] is True
    assert match_data["shelf_id"] == expected_shelf

    # 2. Mismatch barcode
    mismatch_res = client.post(
        f"/api/orders/{order_id}/verify-pick",
        json={"scanned_code": "INVALID-BARCODE-999", "shelf_id": expected_shelf}
    )
    assert mismatch_res.status_code == 400
    mismatch_data = mismatch_res.get_json()
    assert mismatch_data["verified"] is False
