=== Grigora's Kit For Website Building ===
Contributors: latracal
Tested up to: 6.0.1
Requires at least: 5.9
Tags: Templates,Gutenberg,Block Editor,page-builder,Block,Animation,table of contents
Requires PHP: 7.4
Version: 1.2.0
Stable tag: 1.2.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Copyright: latracal

Your only requirement to create a beautiful website. Import from many prebuilt templates, or build with scratch from blocks.

== Description ==

Your only requirement to create a beautiful website. Import from many prebuilt templates, or build with scratch from blocks.

Grigora aims to make people use Full Site Editing and get comfortable with Blocks to create their websites. Full Site Editing is revolutionary, but many users are hesitant to use it for many reasons. Grigora helps connect people to FSE and the new WordPress architecture in general.

🔥 Comes with **20+ Starter Templates** to begin with and **15+ Gutenberg Blocks** to quickly build stunning websites with ease.

👉 **Design Options**: Blocks come with advanced design options ranging from simple hover effects to advanced transforms.  
👉 **Smart Loading**: All the assets for blocks are loaded conditionally, making your website ultra fast.  
👉 **Responsive**: Templates and blocks are responsive by default for each screen size.  

== Gutenberg Blocks ==

* [Advanced Button](https://wpgrigora.com/blocks/button/) - Create a nifty button with hover effects. Great for your CTA actions.
* [Countdown](https://wpgrigora.com/blocks/countdown/) - A simple countdown tool. Add on complete actions like redirect, show content or hide the block.
* [Google Maps](https://wpgrigora.com/blocks/google-maps/) - Add maps in your website without using an API key.
* [Advanced Group](https://wpgrigora.com/blocks/group/) - Group to keep items in place. Has options to add background assets along with CSS3 filters.
* [SVG Icons](https://wpgrigora.com/blocks/icon/) - Add awesome in-line SVG icons to your website. Choose from available 1600+ icons.
* [Number Counter](https://wpgrigora.com/blocks/number-counter/) - Simple Number Animation to show keep your website lively.
* Post Author - Add author box to your post/pages.
* Post Excerpt - Displays the excerpt of a single post.
* Post Taxonomy - Display Terms of a Single Post.
* Post Title - Displays the title of a post, page, or any other content-type.
* Scroll To Top - Quickly scroll back to the top of the page.
* [Star Rating](https://wpgrigora.com/blocks/star-rating/) - Rate your products, reviews or anything.
* [Tabs](https://wpgrigora.com/blocks/tabs/) - Create tabs and add content to them easily within the same page.
* [Text](https://wpgrigora.com/blocks/text/) - Add a beautiful highly customizable text block in your website.

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

= BUILD COMMAND FOR GITHUB =

Command to create a export zip: git archive --format zip --output grigora-kit.zip <branch-name>

== Screenshots ==

1. **Modules** - Access available modules and turn them on/off as required.
2. **Starter Templates** - Import from available templates. Preview, customize, and import them—the best way to start your FSE journey.
3. **Selecting the Starter Template** - Customizing the Starter Template before importing it.
4. **Advanced Blocks** - Choose from the list of advanced Gutenberg blocks to build your website.
5. **Advanced Blocks Settings** - Bunch of settings to customize your blocks along with hover effects.

== Source files ==

[Github](https://github.com/latracal/grigora-kit)

== Dependencies ==

License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

All files, unless otherwise stated, are released under the GNU General Public
License version 2.0 (http://www.gnu.org/licenses/gpl-2.0.html)

Grigora's Kit, Copyright 2019-2022 Latracal Solutions Private Limited.
Grigora's Kit is licensed under the GNU General Public License v2 or later.

All the assets and prebuilt template data are called from wpgrigora.com and demo.wpgrigora.com.
There is no need to connect any account or an API key to use it.
"Grigora's Kit » Starter Templates" page is loaded from wpgrigora.com. Read about Privacy Policy https://wpgrigora.com/privacy-policy/.

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

= WPTT Font Loader =
Source: https://github.com/WPTT/webfont-loader
License: MIT license (https://github.com/WPTT/webfont-loader/blob/master/LICENSE)

== Changelog ==

= 1.2.0 =
Date: September 30, 2022
Addition: Google Maps Block
Addition: Tabs Block
Addition: Group Overflow hidden option
Addition: Motion Animations (Advanced)
Addition: Sticky Option (Advanced)
Addition: Responsive Option (Advanced)
Addition: Position Option (Advanced)
Addition: Perspective Option in Transforms (Advanced)
Addition: Animation Delays (Advanced)
Addition: Alignment option for group if max width is defined
Addition: 12 Fonts to choose from while importing Starter Templates
Improvement: On scroll JS Fixes
Improvement: Starter Templates and Blocks Module are turned on by default
Bug Fix: Range Input Unit Control fix
Bug Fix: Fixed the renderAppender in Group Block
Bug Fix: Post Excerpt CSS was not working in frontend
Bug Fix: Starter Templates import bug fixes
Bug Fix: Scroll to top js enqueue slug incorrect
Bug Fix: Button Gradient was not working
Bug Fix: Number Counter Default Color in Editor
Bug Fix: Group CSS3 Filters was not working
Bug Fix: Button Gradient Transition Time Bug
Bug Fix: Text Typography not working if the content tag is changed
Bug Fix: Group alignment was not working

= 1.1.0 =
Date: August 31, 2022
Addition: Post Title Block
Addition: Post Excerpt Block
Addition: Post Category Block
Addition: Post Tags Block
Addition: Post Author Block
Addition: Gradient Formatting Library
Improvement: Text and paragraph block Inter Convertible
Improvement: Advanced Group interconvertible
Improvement: Button Block UI
Improvement: Number Counter Block UI
Improvement: Star Rating Block UI
Improvement: Advanced Group Block UI
Improvement: Added On Scroll Animation options for Star Rating block
Bug Fix: Advanced Group Border Radius in Editor was not working
Bug Fix: Advanced group > Columns were aligned incorrectly (Block Editor)

= 1.0.10 =
Date: August 18, 2022
Addition: Scroll To Top Block
Addition: Documentation link in Dashboard
Addition: Support link in Dashboard
Improvement: Grigora Kit Blocks dependency in Starter Templates Import
Bug fix: Advanced Group margin auto removed
Bug fix: Removed the overflow hidden from Advanced Group Block

= 1.0.9 =
Date: August 13, 2022
Addition: Star Rating Block
Improvement: Fixed icon slugs to improve the search results in icon picker
Improvement: Auto align center for group whose width is less than screen size
Bug Fix: On Scroll Animation had unexpected behaviour when multiple on scroll blocks were used
Bug Fix: Group Background Overlay CSS3 filter getting reset when value was set to 0
Bug Fix: Number counter align center
Addition (Devs): Added a prop for icon picker to hide remove button
WordPress Plugin Page: Added tags

= 1.0.8 =
Date: August 3, 2022
Addition: Text Block
Addition: Google Fonts for Button Block

= 1.0.7 =
Date: August 1, 2022
Improvement: admin.js fixes
Improvement: Serve minified JS to reduce bandwidth
Improvement (Major): Algorithm for inserting inline css. Now less styles ids are enqueued reducing the HTML page size
Improvement: Fixed an end case where svg icons is not available in Icon Block
Improvement: Removed main.css embedding in frontend
Improvement: Removed the Regenerate ID button and added an algorithm to create unique ids for blocks

= 1.0.6 =
Date: July 23, 2022
Addition: Alpha (Transparency) support for Color Pickers in Blocks.
Addition: Added Horizontal Alignment option for Advanced Group Block.
Addition: Added a new button to Regenerate Unique Block ID (To avoid overlapping IDs when you copy-paste blocks).
Improvement: Removed the padding option from Icon Panel in Icon Block as it was already present in Layout Panel.
Improvement: Removed unnecessary console logs.
Improvement: Change Skip button text to Continue in Starter Templates.
Bug fix: Fixed the inconsistency in on Hover Background Color effect for Advanced Group Block.
Bug fix: Fixed the non-working Text Decoration setting for Number Counter Block.
Bug fix: Fixed the non-working frontend CSS for Number Counter Block.
Bug fix: Fixed the inconsistency in on Hover Text Color effect for Advanced Group Block.
Bug Fix: Fixed a bug where Number Prefix and Suffix were not applying when Auto Format option was selected.

= 1.0.5 =
Date: July 21, 2022
Addition: Option to add a link on the icon block.
Addition: Add block gap setting for a group block.
Addition: Add a vertical-align setting in the group block.
Improvements: Group block hover color fix.
Improvements: Fixed missing skew effect from group block (hover).
Improvements: Fixed Group Block - inner blocks margin issue.

= 1.0.3 =
Addition: Advanced Group Block
Addition: Social Link for Support
Improvements: Range input fix for decimal values

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
