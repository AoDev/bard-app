# How AIM colors create great UX for your apps

Simple steps from design to code. For designers, product managers and frontend developers who care about accessibility in their apps.

> "A powerful design is not just beautiful, it is also readable."

## What is an "AIM color"?

AIM stands for "Accessibility In Mind".

An "AIM color" is meant to ensure that from a *Contrast* and *Font Size* point of view, a text will be readable in your application.

It also means that such color is not to be chosen in isolation but instead chosen with the knowledge that it will be displayed with other colors in the application. Typically: text color or icon color, paired with background color.

_AIM_ is a term that I've got from https://webaim.org/. (Web Accessibility In Mind)

> "Great Web Accessibility starts in the design [webaim.org]"

I recommend to spend some time on their site if you are involved in building user interfaces.


## Typography and Human Vision

It is not a coincidence that _typography_ has been studied for centuries: effective communication is key to achieve success.

_"I can read it, so it's fine"_ is a usual comment in apps development.

But not all users have perfect eyes, nor all screens are the same. Thus, the meaning of "readable" from a person's point of view is subjective.

In fact, a lot of people have vision problems.

Have you ever seen how some people have literally their nose on their mobile in public transports?

* In the US, nearly 4.2 million people over age 40 have a visual impairment. Among those 40 and older, more than 2.9 million have low vision and 1.3 million are legally blind.

* Approximately 8% of men and 0.5% of women among populations with Northern European ancestry have the most common form of color blindness that makes it hard to see red or green.

As developers we can make our user's life easier. That said, it is not only about accessibility. A UI carefully designed with accessibility in mind is pleasant to use for everyone.

## Accessibility Guidelines and AIM tools

Instead of using our own perception, we can rely on the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/).

> "Web Content Accessibility Guidelines (WCAG) is developed through the W3C process in cooperation with individuals and organizations around the world, with a goal of providing a single shared standard for web content accessibility that meets the needs of individuals, organizations, and governments internationally."

__The Accessibility Guidelines deal with many things, but for the goal of this article, we focus on colors only.__

### The WCAG 2 "Contrast Ratio"

> "In WCAG 2, contrast is a measure of the difference in perceived "luminance" or brightness between two colors (the phrase "color contrast" is never used). This brightness difference is expressed as a ratio ranging from 1:1 (e.g. white text on a white background) to 21:1 (e.g., black text on a white background)..." [https://webaim.org/articles/contrast/](webaim.org)


## Using the Contrast Checker tool

When designing, you can use the [Contrast Checker Tool](https://webaim.org/resources/contrastchecker/).

As you will see, there are different levels of accessibility: AA and AAA.

How far you want or need to go is up to you. As a general advice, I'd recommend to always pass the minimum contrast level which is the WCAG AA for large Text.

This applies not only to text, but to the UI icons as well.

<img width="600" alt="Screenshot 2020-11-30 at 11 30 21" src="https://user-images.githubusercontent.com/1526150/100598828-89824f80-32ff-11eb-8e28-1bcc47931a59.png"/>




## How to implement a style guide and a UI framework with AIM colors ?

Now comes the hard part.

> While it's easy for a designer to make a UI look beautiful, the aim constraints makes it more challenging to create a color palette that still reflects your product personality.

I'll present how I work in practice but there are many ways to do it depending on the technologies you use.


### 1. Defining the Color Palette

Some colors come from your brand, some are more generic, but ideally derived from your brand colors as well.

### Colors variables naming

Colors variables can be named as "red-aim" "green-aim" "blue-aim" "gray-aim", etc...

An AIM color may have variants, if there are UI themes, like "Light" and "Dark".

### Color list

| **Color Name**        | **Light** | **Dark** | **Description and meaning**                                                                                                                                                                           |
|-----------------------|-----------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| blue-aim              | #0000ff         | #0000aa        | General Information, actions related to "Navigation" (AIM = passes minimum contrast)                                                                                                                  |
| red-aim               | ...             | ...            | "Dangerous operation", "Error" (AIM = passes minimum contrast)                                                                                                                                        |
| green-aim             | ...             | ...            | Positive action or information (AIM = passes minimum contrast)                                                                                                                                        |
| orange-aim            | ...             | ...            | "Warning" (AIM = passes minimum contrast)                                                                                                                                                             |
| general-background    | ...             | ...            | Typical color applied for the background of the page (body)                                                                                                                                           |
| emphasized-background | ...             | ...            | In general this color is applied to an entire section of information, like the background of boxes, depending in the design, this color may or may not differ from the general-background color       |
| txt-color-aim         | ...             | ...            | Color applied to normal text. Typically black or very dark gray in light themes, white in dark themes. AIM: This color must pass the minimum contrast on __BOTH__ general and emphasized backgrounds. |
| txt-muted-color-aim   | ...             | ...            | Color applied to text that should be a little bit more discreet. For example table header column names. AIM: It must pass the contrast check with the background it will be used.                     |


<img width="600" alt="aim-colors-illustrated" src="https://user-images.githubusercontent.com/1526150/100863840-70aba280-3495-11eb-89a6-4af7965e90ee.png"/>



### Notes:

* Depending on your circumstances, you might want to go with semantic names like `color-positive-aim` | `color-danger-aim` instead of `green-aim` | `red-aim`. This is up to you.

* I like to keep __"aim"__ suffix in the variable name to emphasize the role of this color.

### Using the colors in CSS and JS

[TODO]



## Resources

* https://www.aao.org/newsroom/eye-health-statistics
* https://www.healthmarkets.com/resources/supplemental-health-insurance/eye-disease-vision-statistics-infographic/
* https://webaim.org/resources/designers/