String.prototype.removePunctuation = function() {
	var cleanedString = this.valueOf();
	return cleanedString.replace(/[.,;:!?"']/g, '');
};

var Cloud = function(container) {
	this.container = container;	
	console.log("Created Cloud object.");
};

Cloud.prototype.makeCloud = function(text) {
	var self = this;

	$(this.container + " svg").remove();

	if (text === undefined || text === null || text === "") {
		$(this.container + " .message")
			.css("display", "block");
		return;
	}
	
	this.words = text
		.toLowerCase()
		.removePunctuation()
		.removeStopWords()
		.split(/[\s+]/);
	
	$(this.container + " .message")
		.css("display", "none");
			
	var fill = d3.scale.category20(),
		width = $(this.container).width(),
		height = $(this.container).height();

	d3.layout.cloud()
	    .size([width, height])
	    .words(this.words.map(function(d) {
	      return {text: d, size: 10 + Math.random() * 90};
	    }))
	    .padding(5)
	    .rotate(function() { return ~~(Math.random() * 2) * 90; })
	    .font("Impact")
	    .fontSize(function(d) { return d.size; })
	    .on("end", draw)
	    .start();

	function draw(words) {
	  d3.select(self.container).append("svg")
	      .attr("width", width)
	      .attr("height", height)
	    .append("g")
	      .attr("transform", "translate(" + ~~(width/2) + "," + ~~(height/2) + ")")
	    .selectAll("text")
	      .data(words)
	    .enter().append("text")
	      .style("font-size", function(d) { return d.size + "px"; })
	      .style("font-family", "Impact")
	      .style("fill", function(d, i) { return fill(i); })
	      .attr("text-anchor", "middle")
	      .attr("transform", function(d) {
	        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	      })
	      .text(function(d) { return d.text; });
	}
}