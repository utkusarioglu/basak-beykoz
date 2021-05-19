# Footer structure

The footer consists of a layout and a view component. It is very heavy on
graphical content and it has transparent sections.

## Constraints

### Background colors

Different pages in the app has different background colors. Which means that the
footer has to be positioned on the padding of the content of the page.

### Adjustments for mobile header backdrop-filter behavior

The mobile header uses `backdrop-filter` to blur the page content. The desired
behavior for the header in mobile setting is to have `--brush-white` background
color when the page is scrolled all the way to the bottom. The easiest way to do
this is to have a shim at the end of the footer to make sure that the backdrop
filter is only covering a `--brush-white` background.

### Issues over content control

This app uses two kinds of content:

1. React app pages that can easily be styled and controlled by the frontend app
1. Wordpress rendered content that is set and out of the control of the app

Because of the latter, there is a function within the `Standard.layout`
component to decide whether to hide the footer shim based on the `slug` being
displayed.

**If the footer shim is disabled in the component, it should be styled for the
page's style sheet to make sure that there is some shim for the footer.
Otherwise the footer will appear over the page content.**

## Solutions

The footer and the components that relate to it rely on some css variables to
ensure that a consistent render is created on all kinds of screens.

The variables can be found in `styles/base/_css-vars.scss`. All of these
variables have their documentation provided with them. There are two important
points that we will cover here for extra clarity:

1. `--height-footer-spacing` is the variable that sets the clearance between
   content and the footer's 'ladies'. If this value is 0, then the footer
   content will be adjacent to the page content. Any positive value will create
   some clearance. Do not use `0` as a value as the value set is used by a
   `calc` function.

1. On pages where it's not possible to use the footer shim created by
   `Standard.layout`, you can use the css value below to create the same
   standardized styling:

```scss
.home-section > *:last-child {
  padding-bottom: var(--height-footer-shim-mobile);

  @include breakpoint-min-width(#{$w-md}) {
    padding-bottom: var(--height-footer-shim-desktop);
  }
}
```

In this example, you are seeing the styling used for the home page final section
to make sure that the footer's transparent parts reflect the same color as the
`background-color` of the last section.
