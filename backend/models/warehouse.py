class Warehouse:
    def __init__(self, width=10, height=10, entry_point=(0, 0), exit_point=(0, 9)):
        self.width = width
        self.height = height
        self.entry_point = entry_point
        self.exit_point = exit_point
        self.shelves = []

    def to_dict(self):
        return {
            "width": self.width,
            "height": self.height,
            "entry_point": self.entry_point,
            "exit_point": self.exit_point,
            "shelves": [s.to_dict() for s in self.shelves]
        }
