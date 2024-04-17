# boilerplate game

boilerplate game desu.

## docs

### game data

the main place to edit with all the game data is in `public/assets/data/data.json`

edit these objects:

- `meta` (game title, menu background...)
- `playerData` (name, starting map and position)
- `variables` (used in-game as event flags)
- `maps` (array holding map objects)

### assets

to add/remove/update images edit the files in `public/assets/images`. you can remove the base boilerplate files if you want, or just not use them.

if you add or remove images, update `loadImages()` in `contentManager.js`. you'll have to add filenames (without extensions) of the new images to this array:

```js
const images = ["pc", "menuBg", "frog"];
```

to update music files its the same stuck, but put the files in `public/assets/music`, and update `tracks` array in `loadMusic()`:

```js
const tracks = ["music", "music1"];
```

to add new tiles for maps, you have to add images to `public/images/tiles` with filenames being consecutive numbers (so yes `0.png`, `1.png`, `2.png` you dummy <3)

no support for tilesets right now what were you thinking

if you add more tiles, edit the `tileCount` in `loadImages()` to be the number of the last tile. So if you added tiles up to `25.png`, set `tileCount` to 25.

NOTE: for images you can only use .png files right now, for music only .ogg
