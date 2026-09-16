from flask import Blueprint, jsonify
from services.warehouse_service import WarehouseService

warehouse_bp = Blueprint('warehouse', __name__, url_prefix='/api/warehouse')

@warehouse_bp.route('/layout', methods=['GET'])
def get_layout():
    return jsonify({"layout": WarehouseService.get_layout()})

@warehouse_bp.route('/shelves', methods=['GET'])
def get_shelves():
    return jsonify({"shelves": WarehouseService.get_all_shelves()})
