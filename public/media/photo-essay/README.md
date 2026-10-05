# Photo essay frames

Drop the essay's images straight into this folder. Nothing else needs editing:
`src/lib/photo-essay.ts` reads this directory at build time, so the project
appears in the work index, under the Photo Essay filter, and on its own page
as soon as there are frames here.

Formats: .jpg .jpeg .png .webp .avif

**Order is by filename, and the order of an essay is the argument it makes**,
so prefix the files to control the sequence:

    01-arrival.jpg
    02-the-walk.jpg
    03-dusk.jpg

The first frame becomes the cover; the rest become the gallery.

**Name the files descriptively.** The caption for each frame is generated from
its filename (`02-the-walk.jpg` becomes "The walk"), so a descriptive name is
what a screen reader and a search engine will read. Generic names such as
`DSC_0042.jpg` produce no useful description.

Keep each file around 2400px on the long edge and under about 1MB: images are
served straight from /public without optimisation, so the file you put here is
the file every visitor downloads.
