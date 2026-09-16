from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from routes.product_routes import product_bp
from routes.warehouse_routes import warehouse_bp
from routes.order_routes import order_bp
from routes.shelf_optimization_routes import shelf_opt_bp
from routes.picking_optimization_routes import picking_opt_bp
from routes.stats_routes import stats_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    # Register Route Blueprints
    app.register_blueprint(product_bp)
    app.register_blueprint(warehouse_bp)
    app.register_blueprint(order_bp)
    app.register_blueprint(shelf_opt_bp)
    app.register_blueprint(picking_opt_bp)
    app.register_blueprint(stats_bp)

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "healthy", "service": "Smart Warehouse Optimizer API"})

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
