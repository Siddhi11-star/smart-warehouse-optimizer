from flask import Blueprint, jsonify, request
from services.order_service import OrderService

order_bp = Blueprint('orders', __name__, url_prefix='/api/orders')

@order_bp.route('', methods=['GET'])
def get_orders():
    return jsonify({"orders": OrderService.get_all_orders()})

@order_bp.route('', methods=['POST'])
def create_order():
    data = request.get_json() or {}
    return jsonify({"order": OrderService.create_order(data)}), 201
