# Smart Warehouse Layout & Order Picking Optimization System

A full-stack intelligent warehouse management system designed to optimize item placement on shelves and minimize order picking route distances.

## Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Python 3, Flask, PyMySQL
- **Database**: MySQL
- **Core Focus**: Object-Oriented Programming (OOP) & Data Structures and Algorithms (DSA)

## Project Structure
```
smart-warehouse-optimizer/
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── api.js
│       └── app.js
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── database/
│   │   ├── db_connection.py
│   │   └── schema.sql
│   ├── models/
│   │   ├── product.py
│   │   ├── shelf.py
│   │   ├── warehouse.py
│   │   └── order.py
│   ├── routes/
│   │   ├── product_routes.py
│   │   ├── warehouse_routes.py
│   │   ├── order_routes.py
│   │   ├── shelf_optimization_routes.py
│   │   ├── picking_optimization_routes.py
│   │   └── stats_routes.py
│   ├── services/
│   │   ├── product_service.py
│   │   ├── warehouse_service.py
│   │   ├── order_service.py
│   │   ├── shelf_optimization_service.py
│   │   ├── route_optimization_service.py
│   │   └── stats_service.py
│   └── algorithms/
│       ├── shelf_allocation.py
│       ├── pathfinding.py
│       └── tsp_solver.py
└── README.md
```
