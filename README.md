# Unnamed New Tab Extension

Codename: Exhaust fumes

A pretty minimalistic new tab extension. Allows you to set the background (opacity + color + image) and use gadgets. Also, using the After Dark gadget, you can use an After Dark screensaver instead of an image!

Still kinda looks crufty, but it works.

## Screenshots

Image with gadget

![Image with gadget](https://i.arxius.io/57bf732a.png)

Color with gadget

![Color with gadget](https://i.arxius.io/d150355a.png)

Settings panel

![Settings panel](https://i.arxius.io/acf4a306.png)

Image without gadget

![Image without gadget](https://i.arxius.io/acb3de3f.png)

After Dark screensaver with Gadget (on Microsoft Edge)

![After Dark screensaver with Gadget (on Microsoft Edge)](https://i.arxius.io/ef202ca2.png)

## Gadgets

They can be moved around! You can try writing one of your own (there is no public way to load them, so you have to modify the source code).

They're defined in [useGadgets.ts](src/hooks/useGadgets.ts) and written in [src/gadgets](src/gadgets). [DummyGadget](src/gadget/DummyGadget.tsx) (without state) and [CounterGadget](src/gadget/CounterGadget.tsx) (with state) are pretty simple examples.

## Building

```bash
npm run build
```

## Developing

```bash
npm run watch
```

## Dependencies

A million, it's built on React and random code off the web. I'll garuantee one thing, it doesn't spy on you - which was half the reason why I decided to make it.

After Dark screensavers provided by [bryanbraun/after-dark-css](https://github.com/bryanbraun/after-dark-css)

Icons for Weather Gadget made by [iconixar](https://www.flaticon.com/authors/iconixar)

More copyright notices inside the settings panel.
