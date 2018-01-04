import os
from markovbot import MarkovBot


# Initialise a MarkovBot instance
tweetbot = MarkovBot()

# Get the current directory's path
dirname = os.path.dirname(os.path.abspath(__file__))
# Construct the path to the book
book = os.path.join(dirname, 'markov.txt')
# Make your bot read the book!

tweetbot.read(book)


def looper1 (tweetbot):
    marklist = []
    count = 0
    while count < 10:

        markovify = tweetbot.generate_text(25, seedword=None)
        if markovify == "removethis":
            count += 1
        else:
            print("_5 ")
            print(markovify)
            count += 1



looper1(tweetbot=tweetbot)
