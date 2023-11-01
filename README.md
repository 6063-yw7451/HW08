## Sketch 0

## Summary
The code allows users to load an image and apply a color transformation to specific regions within that image. It's intended to modify the loaded image based on the color scheme used in Piet Mondrian's artwork. The script aims to change regions in the image that resemble three distinct colors in Mondrian's art — red, blue, and yellow. Upon loading an image, it identifies the areas resembling these specific colors and adjusts them accordingly. It also contains functionalities to handle user input for loading images and applying color transformations.

The sketch uses color detection by comparing the RGB values of individual pixels to predefined color values inspired by Piet Mondrian's artwork. It checks if the pixel's color is similar to the specific Mondrian colors for red, blue, and yellow.
If it matches the Mondrian blue, it's turned pink. If it matches the Mondrian yellow, it's transformed randomly into a new color. And if it matches the Mondrian red, it's replaced with the corresponding background image pixel.
If the sketch runs on images of different Mondrian paintings, the colors would be replaced according to their proximity to the defined Mondrian colors in those specific paintings. Consequently, the color mapping could differ if the Mondrian paintings used in the sketch contain shades or hues of red, blue, or yellow that vary from the preset values. 

## Process
1. `preload()` function loads the images.
2. `setup()` function initializes the canvas and sets up file input capabilities. 
3. `draw()` function processes the image and applies color modifications.
4. `resizeImage()` function resizes the loaded image to fit the canvas size
5. `handleFile()` handles the uploaded image 
6. `keyPressed()` function allows users to trigger the file input when pressing the spacebar.
7. `isSimilar()` function compares colors to determine if they are similar based on a given threshold value.

## Challenges
The difficulty lies in analyzing individual pixels of the loaded image to detect and modify areas resembling the specific colors associated with Piet Mondrian's artwork. The code attempts to traverse each pixel of the loaded image and identifies areas resembling Mondrian's primary colors (red, blue, and yellow). It's necessary to accurately compare the RGB values of each pixel with predefined color thresholds to determine similarity. Managing these conditional statements (`if` and `else if` blocks) to correctly identify and modify the image regions based on these color similarities is complex and requires a deep understanding of how images are processed at the pixel level.




## Sketch 1

## Summary
The code creates a canvas that generates an animated visual representation based on a song's audio. It uses various colorful beads that move and change their appearance according to the music's intensity and the user's selection.

The song I picked is Resuscitated Hope.
The visualization of the song's samples is handled through the `mySound.getPeaks(beads.length)` function within the sketch. The `getPeaks()` function retrieves samples from the sound file that correspond to the number of 'beads' created in the sketch. These samples are used to determine the behavior of the graphical elements (`beads`), affecting their size and movement on the canvas.

Each 'bead' on the canvas corresponds to a sample of the song. As the song plays, the samples retrieved from the sound file affect the visual representation (movement, size, and color) of the 'beads' in the canvas, altering their appearance based on the amplitude or characteristics of the song samples at that moment.

## Process
1. Color Palette Slider: Users can select different color themes from a predefined list by using the color palette slider (slider1).
2. Scale Slider: Another slider (slider2) allows users to adjust the scale of the displayed visuals.
3. Background Blur: The canvas displays a blurred effect and responds dynamically to the user interaction with the sliders.
4. Background Music: A background music file is loaded and can be played by clicking on the canvas.
5. Bead Animation: Beads of various colors and sizes are generated and move in response to the audio's peaks. The intensity of the music influences the bead's movement and size, creating an animated visual representation.
6. Interaction Control: The 'space' key toggles the visibility of the color and scale sliders.
7. DOM Elements: Text elements display labels for the sliders, and the sliders allow users to interact with the visual representation by changing color themes and scale.

## Challenges
This code interacts with an audio file, using the `loadSound` function to handle a song. The `loopSong()` function triggers the song to start playing upon a mouse click. Additionally, the `mySound.getPeaks()` method processes the sound file and controls the behavior of the graphical elements (`beads`) on the canvas based on the song's samples. This synchrony between the audio and visual representation is intricate to manage for me.

