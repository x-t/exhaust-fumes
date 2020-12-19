# Unnamed New Tab Extension

Codename: Exhaust fumes

A pretty minimalistic new tab extension. Allows you to set the background (opacity + color + image) and use gadgets.

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

## Gadgets

They can be moved around! You can try writing one of your own (there is no public way to load them, so you have to modify the source code).

They're defined in [useGadgets.ts](src/hooks/useGadgets.ts) and written in [src/gadgets](src/gadgets). [DummyGadget](src/gadget/DummyGadget.tsx) and [CounterGadget](src/gadget/CounterGadget.tsx) are pretty simple examples.

## Building

```bash
npm run build
```

## Developing

```bash
npm run watch
```

## Dependencies

idfk a million, it's built on React and random code off the web. I'll garuantee one thing, it doesn't spy on you - which was half the reason why I decided to make it.
