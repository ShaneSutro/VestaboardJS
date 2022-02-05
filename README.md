# VestaboardJS

[![Build Status](https://app.travis-ci.com/ShaneSutro/VestaboardJS.svg?branch=main)](https://app.travis-ci.com/ShaneSutro/VestaboardJS)
[![Coverage Status](https://coveralls.io/repos/github/ShaneSutro/VestaboardJS/badge.svg?branch=main)](https://coveralls.io/github/ShaneSutro/VestaboardJS?branch=main)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/8245df2d89f24edcbbebe749d87a17ed)](https://www.codacy.com/gh/ShaneSutro/VestaboardJS/dashboard?utm_source=github.com&utm_medium=referral&utm_content=ShaneSutro/VestaboardJS&utm_campaign=Badge_Grade)

[![Wallaby.js](https://img.shields.io/badge/wallaby.js-configured-green.svg)](https://wallabyjs.com)
[![npm version](https://badge.fury.io/js/vestaboard.svg)](https://badge.fury.io/js/vestaboard)
![npm Downloads](https://img.shields.io:/npm/dm/vestaboard?label=npm%20downloads)

![open issues](https://img.shields.io:/github/issues-raw/ShaneSutro/VestaboardJS)
![closed issues](https://img.shields.io:/github/issues-closed-raw/ShaneSutro/VestaboardJS)

![open pull requests](https://img.shields.io:/github/issues-pr-raw/ShaneSutro/VestaboardJS)
![closed pull requests](https://img.shields.io:/github/issues-pr-closed-raw/ShaneSutro/VestaboardJS)

---

## GitHub Stats

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/SonicRift/VestaboardJS)
![GitHub contributors](https://img.shields.io/github/contributors/SonicRift/VestaboardJS)

This is a lightweight and unassuming wrapper for the Vestaboard API. This project is open source and no payment is necessary to use - project donations are always appreciated to help fund this effort. If interested, you can [ view the donation page here.](https://shanesutro.com/donate)

By [Shane Sutro][] and [contributors](https://github.com/SonicRift/VestaboardJS/graphs/contributors)

---

### Official API

You can view more information about Vestaboard's API [here](https://docs.vestaboard.com/). _[Disclaimer](#repository-info-and-disclaimers)_

### Concepts

According to Vestaboard's documentation, software that utilizes the API is considered an `installable`, and as such must be connected to a Vestaboard via an `installation`.

Each Board subscribes to an `installable` via an `installation` and as such is able to recieve a `message`. While I won't get into detail on how these correlate, know that you must first create an `installable` via [Vestaboard's API](https://web.vestaboard.com). You'll need to create an account and register your `installable` to your board.

Once created, you will need to store your API Key and API Secret - you'll need this to communicate with your board. During this process, you will be prompted to select which board you'd like to install this `installable` onto - this is what creates the Subscription ID behind the scenes. Read more below.

---

### Using this package

#### Installation

- Download and install into your project file
- Via `npm`:

`npm install vestaboard`

<!-- #### Usage

This package will simplify the process of connecting your code to Vestaboard's API.
By default, the module will store your API Key, API Secret, and Subscriber ID in a .txt file in the root folder of the project.
If you do _not_ want to store this, pass `saveCredentials=False` into the creation of an `Installable`. Alternatively, you may skip creating an `Installable` alltogether if you already know your Subscription ID (which you can get from Vestaboards official portal if you'd like to skip this step).

If you do **_not_** know your Subscription ID call `Installable()` with your API Key and API Secret to find and store it:

```python
import vestaboard
#This will print your subscription ID, and store all keys in 'credentials.txt'
installable = vestaboard.Installable('your_api_key', 'your_api_secret')

#Pass in the Installable() instance to a new instance of Board()
vboard = vestaboard.Board(installable)
vboard.post('And just like that, we were off.')
```

![Board with plain text example](../media/basictext.png?raw=true)

If you already have your Subscription ID or you do not want to store it, you can call `Board()` directly and pass your API Key, API Secret and Subscription ID directly.
Note that if you choose to not store these credentials, you will need to provide them each time you call a method on a `Board`.
If you do choose to store them, they will be stored in a file called `credentials.txt` in the root directory of your project; remember to add `credentials.txt` to your `.gitignore` to avoid commiting your keys to GitHub. Alternatively, you may create a `config.py` file in your code and store the information there; again, add `config.py` to your `.gitignore`. Never upload API keys or API Secrets to a repository.
You can also create an instance of Installable with only your API Key and API Secret, then provide a subscription ID directly when instantiating a new `Board` by setting `getSubscription=False` when instantiating the Installable.

#### config.py

```python
api_key='DrBXYxUN40z2dpIogNjO'
api_secret='2Qc8cClVov2TI9eeudVP'
subscription_id='5PmlVd5MnjtMIBYcBUXI'
```

#### vestaboard.py

```python
from vestaboard import Board
import config

vboard = Board(apiKey=config.api_key, apiSecret=config.api_secret, subscriptionId=config.subscription_id)

vboard.post('Love is all you need')
```

---

## Currently Supported

Currently this module supports the following:

- Creating an Installable object by passing in an API Key and API Secret

  - This will find and store the Subscription ID for you
  - Passing `getSubscription=False` overrides this - if you set this to False, remember to pass in a Subscription ID when instantiating a new `Board`

- Creating an instance of Board by passing in one of the following:
  - An Installable, instantiated with API Key and API Secret
  - By passing in an API Key, API Secret _and_ Subscription ID directly to `Board()`
  - By passing in an Installable where `getSubscription=False` and manually providing the Subscription ID to `Board`.

The board currently has 2 methods available, the `.post()` method, which takes in a string and sends it to the board, and the `.raw()` method, which allows you to place characters precisely where you'd like them.

### Post

```python
import vestaboard

installable = vestaboard.Installable('your_api_key', 'your_api_secret')
vboard = vestaboard.Board(installable)

vboard.post('Everything you can imagine is real.')
```

The `.post()` method supports all letters and symbols that Vestaboard supports, including all letters, numbers, and symbols.
In addition, you may pass in a character code in curly brackets to represent a single character or a color tile. You can view a reference of character and color codes on [Vestaboard's official website by clicking here.](https://docs.vestaboard.com/characters)
Vestaboard's API currently strips leading and trailing spaces from lines - _this includes the `{0}` character (the black tile)_. To precisely place characters, use the `.raw()` method (see below).

```python
import vestaboard

installable = vestaboard.Installable('your_api_key', 'your_api_secret')
vboard = vestaboard.Board(installable)

vboard.post('Triage Status\n\n{63}High -3{0}{0}items\n {65}Med -18 items\n{66}Low -88 items')
```

![Board with color tiles example](../media/vbcolors.png?raw=true)

### Raw

The `.raw()` method allows you to specify exactly where each tile should be on the board. `.raw()` takes an argument of a list of lists (a 6 x 22 array) where each character has been converted into its corresponding character code, and an optional padding style (for less than 6 line lists).

```python
import vestaboard

characters = [
    [63, 64, 65, 66, 67, 68, 69, 63, 64, 65, 66, 67, 68, 69, 63, 64, 65, 66, 67, 68, 69, 63],
    [64,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 64],
    [65,  0,  0,  0,  8,  1, 16, 16, 25,  0,  2,  9, 18, 20,  8,  4,  1, 25,  0,  0,  0, 65],
    [66,  0,  0,  0,  0,  0,  0,  0, 13,  9, 14,  1, 20, 15, 37,  0,  0,  0,  0,  0,  0, 66],
    [67,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 67],
    [68, 69, 63, 64, 65, 66, 67, 68, 69, 63, 64, 65, 66, 67, 68, 69, 63, 64, 65, 66, 67, 68]
]

installable = vestaboard.Installable('your_api_key', 'your_api_secret')
vboard = vestaboard.Board(installable)

vboard.raw(characters)
```

![Board with raw input example](../media/rawexample.png?raw=true)

### New in Version 1.0.0

The `.raw()` method now supports padding and truncating if more or fewer than 6 lines are provided! By default, your text will be centered vertically on the board, but will generate a warning (if an odd number of lines are provided, the additional line will be at the bottom). Supress this warning by passing in `pad='center'`. When passing in greater than 6 lines, the board will only display the first 6 lines.

You can also specify whether you'd like the padding to be added above or below your text by passing in `pad='top'` or `pad='bottom'` (only available when passing in < 6 lines). `pad='top'` will add padding above your text (your text will be at the bottom of the board), and `pad='bottom'` will add padding below your text (your text will be at the top of the board).

---

To assist with character conversion, use the `Formatter` class.
The `Formatter` has two public helper options:

- `.convert()`
- `.convertLine()`

### Convert

If converting a string, use the `.convert()` method. By default, `.convert()` will split by letter and return an array of character codes corresponding to the string you passed in:

```python
from vestaboard.formatter import Formatter

Formatter().convert('Oh hi!')
# Returns [15, 8, 0, 8, 9, 37]
```

To split by word, pass in the argument `byWord=True` along with your input string:

```python
from vestaboard.formatter import Formatter

Formatter().convert('Oh hi!', byWord=True)
# Returns [[15, 8], [8, 9, 37]]
```

### Convert Line

If you'd like to convert an entire line at once, use the `.convertLine()` method. `.convertLine()` centers text by default. To left justify or right justify, pass `justify='left'` or `justify='right'`.

```python
from vestaboard.formatter import Formatter

Formatter().convertLine('Happy Birthday!')
# Returns [0, 0, 0, 8, 1, 16, 16, 25, 0, 2, 9, 18, 20, 8, 4, 1, 25, 37, 0, 0, 0, 0]
```

## Upcoming Support

- Formatting

  - Want to right justify, left justify, or center the entire content? Coming soon!

- Templates
  - Choose from a list of templates to send to your board, including calendars, Q&A, trivia, and more

---

## Repository Info and Disclaimers

### Needs

- Conversion from string to list of lists for `.raw()` method
- Unit and other tests inside the `/test` folder
- Suggestions or ideas for improvement are always welcome! -->

Interested in contributing to this project? Send a PR with changes and I'd be happy to review! If you're having trouble with this library, be sure to [open an issue][] so that I can look into the problem. Any details that can be provided alongside the problem would be greatly appreciated.
Thanks!

#### [Shane Sutro][]

#### You belong here :heart:

_Note: this project is maintaned by independent developers and is not sponsored by nor affiliated with Vestaboard, Inc. I am unable to make changes to their API or answer questions about the company, upcoming API support, or future-state plans. For questions regarding Vestaboard's API, privacy policies, or to request assistance with your board, [please get in touch with them here.](https://www.vestaboard.com/contact)_

[open an issue]: https://github.com/SonicRift/Vestaboard/issues
[shane sutro]: https://github.com/SonicRift
