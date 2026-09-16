class Shelf:
    def __init__(self, id=None, shelf_code="", zone="", x_coord=0, y_coord=0, capacity=100, current_load=0):
        self.id = id
        self.shelf_code = shelf_code
        self.zone = zone
        self.x_coord = x_coord
        self.y_coord = y_coord
        self.capacity = capacity
        self.current_load = current_load

    def to_dict(self):
        return {
            "id": self.id,
            "shelf_code": self.shelf_code,
            "zone": self.zone,
            "x_coord": self.x_coord,
            "y_coord": self.y_coord,
            "capacity": self.capacity,
            "current_load": self.current_load
        }
