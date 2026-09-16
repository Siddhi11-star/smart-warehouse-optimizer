import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Base Configuration for Flask and MySQL Database."""
    SECRET_KEY = os.getenv('SECRET_KEY', 'smart-warehouse-secret-key-2026')
    MYSQL_HOST = os.getenv('MYSQL_HOST', 'localhost')
    MYSQL_PORT = int(os.getenv('MYSQL_PORT', 3306))
    MYSQL_USER = os.getenv('MYSQL_USER', 'root')
    MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD', '')
    MYSQL_DB = os.getenv('MYSQL_DB', 'smart_warehouse_db')
