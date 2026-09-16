from flask import Blueprint, jsonify
from services.stats_service import StatsService

stats_bp = Blueprint('stats', __name__, url_prefix='/api/stats')

@stats_bp.route('', methods=['GET'])
def get_stats():
    return jsonify(StatsService.get_warehouse_statistics())
