const AboutPage = () => {
	return (
		<div>
			<div className="tagline">
				Welcome to Yap! Like Yelp, it's a website dedicated to listing local places for lunch with 100% less exploitation of small businesses.
			</div>
			<div className="about-section">
				<div className="title">May 13, 2023 (v2.0)</div>
				<ul>
					<li>Reactified the entire website.</li>
					<li>Added a login page and authentication system.</li>
				</ul>

				<div className="title">Nov 2, 2021 (v1.2)</div>
				<ul>
					<li>
						Database changes - added category icons, distance, cost, travel time, wait time, death date, food type, parking type, quadrant, has wifi, is cash-only,
						frequency.
					</li>
					<li>Dynamically loading location data and displaying it in information section (above map).</li>
					<li>Displaying the filter icons and "date of death" in the location list on the left.</li>
					<li>Map will pan to the location when clicked in the list (Requested by Kristen)</li>
					<li>Map has clutter hidden like bus routes and points of interest.</li>
					<li>Added wi-fi and cash only to filters.</li>
					<li>Changed distance icons - removed the bus.</li>
					<li>Markers for every single location and when clicked display the full location name in a closeable tooltip.</li>
					<li>Category icons in the list are now images because unicode was dependent on the client OS.</li>
					<li>Toned down the colors - less blue.</li>
					<li>Slightly decreased height of the map to make room for information.</li>
					<li>Added About and Admin pages.</li>
					<li>Added calendar widget.</li>
					<li>Moved JS and CSS into separate files.</li>
					<li>Reorganized all images.</li>
				</ul>
			</div>
			<div className="todo-section">
				<div className="title">To-Do List</div>
				<ul>
					<li>Reviews, What's Hot, What's Not</li>
					<li>Cross-authentication and sharing of users from Sodastock</li>
					<li>Links to menus (MenuURL) or picture of menus (MenuFileName)</li>
					<li>Bold the frequency and color-code based on amount. Put in circle like the Price in sodastock.</li>
					<li>Put abbreviation next to latitude? Widen the modal?</li>
					<li>Hover-text of pins needs text without HTML escaping</li>
					<li>Unified search to search for name, parking, quadrant, etc</li>
					<li>General notes (same as description?)</li>
					<li>Mark missing information in admin</li>
					<li>Direct URLs to places</li>
					<li>Sort the permanently closed by death date.</li>
					<li>Remove autocomplete from latitude and longitude, and others</li>
				</ul>
			</div>
		</div>
	);
};

// Filter traverse .location, and hide based on data-id="vegan" attributes, if they are there-->
// general notes (limited menu on mondays burritos, burrito bowls, chip at tex mex, odd hours open)-->

export default AboutPage;
