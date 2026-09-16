class Order:
    def __init__(self, id=None, order_code="", status="pending", priority=1, items=None):
        self.id = id
        self.order_code = order_code
        self.status = status
        self.priority = priority
        self.items = items if items is not None else []

    def to_dict(self):
        return {
            "id": self.id,
            "order_code": self.order_code,
            "status": self.status,
            "priority": self.priority,
            "items": self.items
        }
