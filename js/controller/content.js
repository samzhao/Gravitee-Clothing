
// Add a controller to the application.
window.application.addController((function( $, application ){

	function Controller(){
		// Route URL events to the controller's event handlers.
		this.route( "/", this.index );
		this.route( "/home", this.index );
		this.route( "/products", this.products );
		this.route( "/about", this.about );
		this.route( "/contact", this.contact );
		this.route( "/search", this.search );
		this.route( "/404", this.pageNotFound );

		// Set default properties.
		this.navigation = null;
		this.navigationItems = null;
		this.views = null;
		this.homeView = null;
		this.productsView = null;
		this.aboutView = null;
		this.contactView = null;
		this.searchView = null;
		this.pageNotFoundView = null;
	};

	// Extend the core application controller (REQUIRED).
	Controller.prototype = new application.Controller();
	
	Controller.prototype.init = function(){
		this.navigation = $( "#site-nav" );
		this.navigationItems = this.navigation.find( "> li:has(a[rel])" );
		this.views = $( "#content-stages > li" );
		this.homeView = this.views.filter( "[ rel = 'home' ]" );
		this.productsView = this.views.filter( "[ rel = 'products' ]" );
		this.aboutView = this.views.filter( "[ rel = 'about' ]" );
		this.contactView = this.views.filter( "[ rel = 'contact' ]" );
		this.searchView = this.views.filter( "[ rel = 'results' ]" );
		this.pageNotFoundView = this.views.filter( "[ rel = '404' ]" );
		
		$( "#site-copyright span.copyright-year" ).text(
			(new Date()).getFullYear()
		);
	};
	
	// show the views.

	Controller.prototype.index = function( event ){
		this.showView( this.homeView );
	};
	
	

	Controller.prototype.products = function( event ){
		this.showView( this.productsView );
	};
	
		
	Controller.prototype.about = function( event ){
		this.showView( this.aboutView );
	};
	
	
	Controller.prototype.pageNotFound = function( event ){
		this.showView( this.pageNotFoundView );
	};
	
	
	Controller.prototype.contact = function( event ){
		this.showView( this.contactView );
	};

	Controller.prototype.search = function( event ){
		this.showView( this.searchView );
	};
	
	Controller.prototype.showView = function( view ){
		// Turn off the primary navigation. 
		this.navigationItems.removeClass( "active" );
		
		// Remove the current view class.
		this.views.removeClass( "current-stage" );
		
		// Turn on the correct navigation. Match the REL attribute of the given
		// view to the REL attribute of the anchor inside the navigation item.
		if (view.attr( "rel" )){
			this.navigationItems.filter( ":has(a[rel = '" + view.attr( "rel" ) + "' ])" ).addClass( "active" );
		}
		
		// Add the primary content view class.
		view.addClass( "current-stage" );
	};
	
	
	// ----------------------------------------------------------------------- //
	// ----------------------------------------------------------------------- //
	
	// Return a new contoller singleton instance.
	return( new Controller() );
	
})( jQuery, window.application ));
