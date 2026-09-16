from flask import Blueprint, jsonify
from services.route_optimization_service import RouteOptimizationService

picking_opt_bp = Blueprint('picking_optimization', __name__, url_prefix='/api/optimize/picking')

@picking_opt_bp.route('/<int:order_id>', methods=['POST'])
def run_route_optimization(order_id):
    result = RouteOptimizationService.optimize_picking_route(order_id)
    return jsonify(result)
