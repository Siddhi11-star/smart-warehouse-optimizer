class Product:
    def __init__(self, id=None, name="", category="", weight_kg=0.0, demand_frequency=0):
        self.id = id
        self.name = name
        self.category = category
        self.weight_kg = weight_kg
        self.demand_frequency = demand_frequency

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "weight_kg": self.weight_kg,
            "demand_frequency": self.demand_frequency
        }
