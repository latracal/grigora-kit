=== Grigora's Kit For Website Building ===
Contributors: latracal
Tested up to: 6.0.1
Requires at least: 5.9
Requires PHP: 7.4
Version: 1.0.2
Stable tag: 1.0.2
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Copyright: latracal

Command to create a export zip: git archive --format zip --output grigora-kit.zip <branch-name>

== Description ==

Your only requirement to create a beautiful website. Import from many prebuilt templates, or build with scratch from blocks.

Grigora aims to make people use Full Site Editing and get comfortable with Blocks to create their websites. Full Site Editing is revolutionary, but many users are hesitant to use it for many reasons. Grigora helps connect people to FSE and the new WordPress architecture in general.
All the assets and prebuilt template data are called from wpgrigora.com and demo.wpgrigora.com.
There is no need to connect any account or an API key to use it.
"Grigora's Kit » Starter Templates" page is loaded from wpgrigora.com. Read about Privacy Policy https://wpgrigora.com/privacy-policy/.

== Installation ==

= AUTOMATIC INSTALLATION =

Automatic installation is the easiest option as WordPress handles the file transfers itself and you don’t even need to leave your web browser.

1. Go to your WordPress Plugin installation menu (Dashboard > Plugins > Add New)
2. In the search field type “Grigora Kit” and press enter.
3. “Install Now” and then click “Active”

= MANUAL INSTALLATION =

For Manual installation, you download our product from WordPress directory uploading it to your web-server via your FTP or CPanel application.

1. Download the plugin and unzip it
2. Using an FTP program or CPanel upload the unzipped plugin folder to your WordPress installation’s wp-content/plugins/ directory.
3. Activate the plugin from the Plugins menu (Dashboard > Plugins > Installed Plugins) within the WordPress admin.

== Screenshots ==

1. **Modules** - Access available modules and turn them on/off as required.
2. **Starter Templates** - Import from available templates. Preview, customize, and import them—the best way to start your FSE journey.
3. **Selecting the Starter Template** - Customizing the Starter Template before importing it.
4. **Advanced Blocks** - Choose from the list of advanced Gutenberg blocks to build your website.
5. **Advanced Blocks Settings** - Bunch of settings to customize your blocks along with hover effects.

== Source files ==

[Github](https://github.com/latracal/grigora-kit)

== Dependencies License ==

License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

All files, unless otherwise stated, are released under the GNU General Public
License version 2.0 (http://www.gnu.org/licenses/gpl-2.0.html)

Grigora's Kit, Copyright 2019-2022 Latracal Solutions Private Limited.
Grigora's Kit is licensed under the GNU General Public License v2 or later.

= FSE Design Import/Export =
The starter templates importing functions is derived upon FSE Design Import/Export by uxl themes (https://wordpress.org/plugins/design-import-export/). 
FSE Design Import/Export is distributed under the terms of the GNU GPL v2 or later.

= WP Dismiss Notice =
Purpose: To set and create dismissable admin notices.
Source: A Clone of https://github.com/w3guy/persist-admin-notices-dismissal

= Animations CSS =
Purpose: To allow user to add animations on frontend.
Source: https://github.com/animate-css/animate.css
License: Hippocratic License (https://firstdonoharm.dev/)

= CountUp.js =
Source: https://github.com/inorganik/CountUp.js
License: MIT license (https://github.com/inorganik/countUp.js/blob/master/LICENSE.md)

== Changelog ==

= 1.0.2 =
Addition: Table of Contents Module
Addition: Icon Block
Addition: Number Counter Block
Improvements: Bug fixes and enchangement in @components inputs
Improvements: Bug Fixes In Button Block
Improvements: Icon Picker Component fixes for no icon selected
Improvements: Consent paragraphs before installing demo
Improvements: Removed templates-meta.json and templates.json local files
Improvements: Changed JSON caching from 1 day to 3 days

= 1.0.1 =
Addition: Tested upto - Updated it to current wordpress version
Addition: Stable tag - Added
Improvement: Sanitized all the POST, or JSON input datas
Improvement: Escaped all the variables rendering in frontend
Improvement: Data validation has been done correctly. Whether it be from any json file or POST, GET data, we've ensure that everything is validated.
Improvement: Fixed unsafe SQL calls.

= 1.0.0 =
Initial Release.
