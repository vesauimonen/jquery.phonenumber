jquery.phonenumber
==================

Nice little jQuery plugin for using PhoneFormat.js

Provides phone number formatting for input element as user types. Uses
Al Beebe's PhoneFormat.js which is built using Google's libphonenumber library.

Prerequisites
-------------

* jQuery
* PhoneFormat.js (http://www.phoneformat.com/)

Make sure that both jQuery and PhoneFormat.js are loaded before using phoneNumber.js

Usage
-----

    $('input.phone-number').phoneNumber({
        'format': 'local',
        'country': 'FI'
    });
    
Options
-------

###format

Phone number format must be one of the following:
* `local`
* `international`
* `e164`

###country

A two-digit country code of the phone number, e.g. `US`
