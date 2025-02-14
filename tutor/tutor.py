
try:
    from tutor.random_hand import Hand
except ImportError:
    from random_hand import Hand

class Tutor(object):
    def __init__(self):
        self.hand = None
        self.has_red = True
        self.chi_chance = 0.75
        self.chi_open_chance = 0.5
        self.pon_chance = 0.75
        self.pon_open_chance = 0.65
        self.kan_open_chance = 0.75
        self.other_player_kan_chance = [0.3, 0.2, 0]

        # debug

    def generate(self):
        self.hand = Hand()

        self.hand.generate(self)

    def get_hand(self):
        return self.hand


if __name__ == "__main__":
    tutor = Tutor()
    tutor.generate()
    tutor.get_hand().print()
