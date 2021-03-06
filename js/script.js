// JavaScript Document
window.onload = function(){
	console.log("Junior developer test.");
	
	// declare your variables here.
	var background;
	var blueText;
	var gradientText;
	var skyLogo;
	var twoProducts;
	var gradientStamp;
	var greyCopy;
	var blueCopy;
	var cta;
	var limitedTimeOffer;
	
	// store a reference to the canvas which we will draw on.
	var stage = new createjs.Stage("stage");
	
	// register the stage to handle mouse events. 
	stage.enableMouseOver(10);
	
	// register the Ticker to listen for the tick event.
	createjs.Ticker.addEventListener("tick", handleTick, false);
	
	// redraw the canvas - like Event.ENTER_FRAME in Adobe Flash.
	function handleTick(event) {
		stage.update();
	}
	
	// create a preloader to load the images.
	var loader = new createjs.LoadQueue(false);
	
	// when all images are loaded call the handleAllImageLoaded function.
	loader.on('complete', handleAllImagesLoaded, this);
	
	// provide a manifest of files and ids to be loaded.
	loader.loadManifest([
		{id: "background", src:"images/frame1/background.png"},
		{id: "fr1BlueText", src:"images/frame1/blue-text.png"},
		{id: "fr1GradientText", src:"images/frame1/gradient-text.png"},
		{id: "skyLogo", src:"images/frame1/sky-logo.png"},
		{id: "fr1TwoProducts", src:"images/frame1/two-products.png"},
		{id: "fr2GradientStamp", src:"images/frame2/gradient-stamp.png"},
		{id: "fr2GradientText", src:"images/frame2/gradient-text.png"},
		{id: "fr2GreyCopy", src:"images/frame2/grey-copy.png"},
		{id: "fr3BlueCopy", src:"images/frame3/blue-copy.png"},
		{id: "fr3Cta", src:"images/frame3/cta.png"},
		{id: "fr3GradientText", src:"images/frame3/gradient-text.png"},
		{id: "fr3GreyCopy", src:"images/frame3/grey-copy.png"},
		{id: "fr3LimitedTimeOffer", src:"images/frame3/limited-time-offer.png"}
	]);
	
	function handleAllImagesLoaded() {
		console.log("All the images have loaded.");
		drawTheBannerBackground();
	}
	
	function drawTheBannerBackground() {
		console.log("draw and animate the background.");
		
		// provide the loader result for the item with id == 'background'
		// as a bitmap which will be stored in our background variable.
		background = new createjs.Bitmap( loader.getResult( "background" ) );
		
		// set the background bitmap alpha to zero.
		background.alpha = 0;
		
		// add background to the display list.
		stage.addChild( background );
		
		// animate the background bitmap alpha value to 1 over the duration of 1000 milliseconds.
		createjs.Tween.get( background ).to( {alpha:1}, 1000 );
		
		// after the background is drawn on the canvas draw and animate the content for frame 1.
		setTimeout(frame1, 100);
	}

	function stopAnimation() {
		console.log("All animations have been stopped");
		createjs.Ticker.removeEventListener("tick", handleTick);
	}

	function hideElements(array) {
		for(var i = 0; i < array.length; i++) {
			array[i].alpha = 0;
		}
	}
	
	function frame1() {
		console.log("draw and animate frame one.");
		
		// Stop all animations after 15 seconds
		setTimeout(stopAnimation, 15000);

		blueText = new createjs.Bitmap( loader.getResult( "fr1BlueText" ) );
		gradientText = new createjs.Bitmap( loader.getResult( "fr1GradientText" ) );
		skyLogo = new createjs.Bitmap( loader.getResult( "skyLogo" ) );
		twoProducts = new createjs.Bitmap( loader.getResult( "fr1TwoProducts" ) );

		// Hide elements before adding to the canvas
		hideElements([gradientText, blueText]);

		// Add elements to canvas
		stage.addChild(skyLogo, twoProducts, gradientText, blueText);

		// Animate elements
		createjs.Tween.get(gradientText)
			.to({alpha: 1}, 1000)
			.wait(3000)
			.to({alpha: 0}, 1000);

		createjs.Tween.get(blueText)
			.wait(1000)
			.to({alpha: 1}, 1000)
			.wait(2000)
			.to({alpha: 0}, 1000);

		createjs.Tween.get(twoProducts)
			.wait(4000)
			.to({alpha: 0}, 1000);
		// after a timeout and the animations have completed, draw frame 2.
		setTimeout(frame2, 5000);
	}
	
	function frame2() {
		console.log("draw and animate frame two.");
		gradientStamp = new createjs.Bitmap( loader.getResult( "fr2GradientStamp" ) );
		gradientText = new createjs.Bitmap( loader.getResult( "fr2GradientText" ) );
		greyCopy = new createjs.Bitmap( loader.getResult( "fr2GreyCopy" ) );
		
		// Hide elements before adding to the canvas
		hideElements([gradientText, greyCopy])

		// Start with stamp position off canvas
		gradientStamp.y = -250;

		// Add elements to canvas
		stage.addChild(gradientText, greyCopy, gradientStamp);

		// Animate elements
		createjs.Tween.get(gradientText)
			.to({alpha: 1}, 1000)
			.wait(3000)
			.to({alpha: 0}, 1000);

		createjs.Tween.get(greyCopy)
			.wait(1000)
			.to({alpha: 1}, 1000)
			.wait(2000)
			.to({alpha: 0}, 1000);

		createjs.Tween.get(gradientStamp)
			.wait(1000)
			.to({y: 0}, 1000, createjs.Ease.bounceInOut)
			.wait(2000)
			.to({alpha: 0}, 1000);

		// after a timeout and the animations have completed, draw frame 3.
		setTimeout(frame3, 5000);
	}
	
	function frame3() {
		console.log("draw and animate frame three.");
		var sheen = new createjs.Shape();
		var blurFilter = new createjs.BlurFilter(5, 5, 1);
		var bounds = blurFilter.getBounds();

		blueCopy = new createjs.Bitmap( loader.getResult( "fr3BlueCopy" ) );
		cta = new createjs.Bitmap( loader.getResult( "fr3Cta" ) );
		gradientText = new createjs.Bitmap( loader.getResult( "fr3GradientText" ) );
		greyCopy = new createjs.Bitmap( loader.getResult( "fr3GreyCopy" ) );
		limitedTimeOffer = new createjs.Bitmap( loader.getResult( "fr3LimitedTimeOffer" ) );

		// Hide elements before adding to the canvas
		hideElements([gradientText, blueCopy, limitedTimeOffer, greyCopy, sheen]);

		// Style sheen element
		sheen.graphics
			.beginFill("#fff")
			.drawRect(0, 0, 20, 50);
		sheen.skewX = 50
		sheen.filters = [blurFilter];
		sheen.cache(-50+bounds.x, -50+bounds.y, 100+bounds.width, 100+bounds.height);
		
		// Add elements to canvas
		stage.addChild(cta, sheen, gradientText, blueCopy, limitedTimeOffer, greyCopy);

		// Animate elements
		createjs.Tween.get(gradientText).to({alpha: 1}, 1000);
		createjs.Tween.get(blueCopy)
			.wait(1000)
			.to({alpha: 1}, 1000);
		createjs.Tween.get(limitedTimeOffer)
			.wait(2000)
			.to({alpha: 1}, 1000);
		createjs.Tween.get(greyCopy)
			.wait(3000)
			.to({alpha: 1}, 1000);
		createjs.Tween.get(sheen)
			.wait(4000)
			.to({x: 160, y: 202}, 0)
			.to({alpha: 0.5}, 100)
			.to({x: 300}, 300)
			.to({alpha: 0}, 300);
	}
};