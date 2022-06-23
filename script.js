var iframe = document.getElementById('model-frame');

var version = '1.7.1';

var uid = 'dd2e66b05ba1435bb1fa22e5297a8ca7';

var client = new Sketchfab( version, iframe);
var nodes = [172,189,200,221,238,255,270,279,282,294,306,312,318,338,344,350,370,382,394,406,418,430,442,454,466,478,490,502,514,526,538,550,562,574,586,598,610,622,634,646,658,670,682,694,706,718,730,742,754,766,778,790,802,814,826,838,850,862,874,886,898,910,922,934,946,958,970,982,994,1006,1018,1030,1042,1054,1066,1078,1090,1102,1114,1126,1138,1150,1162,1174]
var nodes = [115, 130, 142, 154, 178, 190, 202, 214, 226, 238, 250, 262, 274, 286, 298, 310, 322, 334, 346, 358, 370, 382, 394, 406, 418, 442, 454, 466, 478, 490, 502, 514]
var allNodes = []
var helmet_nodes = [5, 20, 29, 35, 50, 59, 75, 84, 100]

//		Open Vision == 0		: 		Aggressive Vision == 1			//
var OPEN = 0
var AGGRESSIVE = 1

var clickedColor = "gray"; // gray
var clickableColor = "black"; // maroon
var blockedColor = "red"; // black
var costHTML = document.getElementById("cost"); 
var cost;
var color;
var maskID;
var shipping_cost = -1;


var vision = OPEN

class bar{
	constructor(op, ag, name, price, necSet, blockedOP, blockedAG, togNodes ){
		this.name = name;
		this.classID = "#" + name
		//  Blocked Nodes are Nodes that cannot be selected if this Node is active  //
		this.blockedNodes = [[],[]]
		if(blockedOP)
			this.blockedNodes[0] = blockedOP
		if(blockedAG)
			this.blockedNodes[1] = blockedAG
		//  Necessary Nodes are ones that need to be active for this Node to be selectable  //
		this.necNodes = [[],[]]
		if (necSet)
			this.necNodes = [necSet, necSet]
	
		// Toggle Nodes these are the nodes that will toggle off when this node is active and vise versa
		this.togNodes = [[],[]]

		this.key = [op,ag]
		this.price = price
		
		this.addBlockedNodes = function addBlockedNodes(nodeSet){
			for(var i = 0; i < nodeSet[0].length; i++){
				this.blockedNodes[0].push(nodeSet[0][i])
			}
			for(var i = 0; i < nodeSet[1].length; i++){
				this.blockedNodes[1].push(nodeSet[1][i])
			}
		}
		this.addNecNodes = function addNecNodes(nodeSet){
			for(var i = 0; i < nodeSet[0].length; i++){
				this.necNodes[0].push(nodeSet[0][i])
			}
			for(var i = 0; i < nodeSet[1].length; i++){
				this.necNodes[1].push(nodeSet[1][i])
			}
		}
		this.addTogNodes = function addTogNodes(nodeSet){
			for(var i = 0; i < nodeSet[0].length; i++){
				this.togNodes[0].push(nodeSet[1][i])
			}
			for(var i = 0; i < nodeSet[0].length; i++){
				if(nodeSet[0][i].togNodes[0] != this.togNodes[0])
					nodeSet[0][i].togNodes[0] = this.togNodes[0]
			}

			for(var i = 0; i < nodeSet[1].length; i++){
				this.togNodes[1].push(nodeSet[1][i])
			}
			for(var i = 0; i < nodeSet[1].length; i++){
				if(nodeSet[1][i].togNodes[1] != this.togNodes[1])
					nodeSet[1][i].togNodes[1] = this.togNodes[1]
			}
		}
		allNodes.push(this)
	}
}

var v1 = new bar([274], [490], "v1", 10);
var v2 = new bar([286], [502], "v2", 25);
var v3 = new bar([298], [514], "v3", 25);

var h3 = new bar([310], [310], "h3", 30);
var h4 = new bar([322], [322], "h4", 30);
var h5 = new bar([334], [334], "h5", 30);
var h6 = new bar([346], [346], "h6", 30);
var h7 = new bar([358], [358], "h7", 30);

var vn = new bar([418], [418], "vn", 80, null, [], []); //nose

var l1 = new bar([382], [382], "l1", 25, [[v1, vn], h6], [v2], [v2]);
var l2 = new bar([394], [394], "l2", 25, [[v1, vn], h4], [v3, v2], [v3, v2]);
var l3 = new bar([406], [406], "l3", 25, [[v1, vn], h3], [], []); // open 0

var b3 = new bar([190],[190], "b3", 0, null,[],[]); // HD

var d1 = new bar([442], [442], "d1", 25, [[v1, vn]], [l2, v2], [l2, v2]);
var d2 = new bar([454], [454], "d2", 25, [[v1, vn], b3], [v2, v3, l2], [v2, v3, l2]); // \\//
var d3 = new bar([466], [466], "d3", 25, [[v1, vn], b3], [v2, v3, l2], [v2, v3, l2]);
var d4 = new bar([478], [478], "d4", 25, [[v1, vn]], [l1, l2], [l1, l2]);

v2.addBlockedNodes([[d2, d3], [d2, d3]])
v3.addBlockedNodes([[d2, d3], [d2, d3]])
v1.addTogNodes([[v1, vn], [v1, vn]])

var e1 = new bar([214],[202], "e1", 10, [b3]); // EG HD  BECK : 238
var e2 = new bar([250], [250], "e2", 35, [b3]); // HAWK HD ag 0
var e3 = new bar([262],[226], "e3", 10, [b3]); // OPEN
var e4 = new bar([238],[238], "e4", 35, [b3]); // BECK ag 0

e1.addTogNodes([[e1, e2, e3, e4], [e1, e2, e3, e4]])
var beck = new bar([178],[178], "beck", 165, null, [d4], [] ) // 178 Frame Riser
var bull = new bar([370],[142], "bull", 35, null, [l2, v3, d2, d3, vn], [l2, v3, d1, d2, d3, vn]); // Open Bull
var jw = new bar([154], [154], "jw", 50, null, [v3, bull, l1, l2, d2, d3], [v3, bull, l1, l2, d2, d3]); // jwill
var h808 = new bar([130], 0,"808", 80, [[v3, jw]], [h6, h5, h7], []);

l1.addBlockedNodes([[jw], [jw]])
l2.addBlockedNodes([[jw], [jw]])
d2.addBlockedNodes([[jw], [jw]])
d3.addBlockedNodes([[jw], [jw]])
v3.addBlockedNodes([[jw], [jw]])

h6.addBlockedNodes([[h808], []])
vn.addBlockedNodes([[bull], [bull]])
bull.addBlockedNodes([[jw], [jw]])
v2.addBlockedNodes([[d2], [d2]])
v3.addBlockedNodes([[d2, bull], [d2, bull]])

var activeNodes = []
var blockedNodes = []
var permBlockedNodes = []

var refresh = function refresh(api){
	var aNodes = [] // PlaceHolder Active Nodes
	blockedNodes = [] // Resetting Blocked Nodes

	//		Checking to See if nodes have their Necessary Nodes Activated Else Removing Them & Adding to BlockedNodes  //
	for(var i=0; i < activeNodes.length; i++){
		if(necSelected(activeNodes[i]))
			aNodes.push(activeNodes[i])
		else
			blockedNodes.push(activeNodes[i])
	}
	activeNodes = aNodes

	//		Refreshing Current Blocked Nodes Based on Active Nodes 		//
	for(var i=0; i < activeNodes.length; i++){
		for(var j=0; j < activeNodes[i].blockedNodes[vision].length; j++){
			if (!blockedNodes.includes(activeNodes[i].blockedNodes[vision][j]))
				blockedNodes.push(activeNodes[i].blockedNodes[vision][j])
		}
	}

	// 		Checking if necNodes are in Blocked Nodes if so adding to BlockNodes  	 //

	for(var i=0; i < allNodes.length; i++){
		if((!blockedNodes.includes(allNodes[i]) && !necSelected(allNodes[i]) || cantSelected(allNodes[i]))){
			blockedNodes.push(allNodes[i])
		}
	}

	//		Hiding all Blocked Nodes  		//
	for(var i=0; i < blockedNodes.length; i++){
		hideSet(api, blockedNodes[i].key[vision])
	}

	for(var i = 0; i < permBlockedNodes.length; i++){
		blockedNodes.push(permBlockedNodes[i])
	}

	for(var i=0; i < allNodes.length; i++){
		if(activeNodes.includes(allNodes[i])){
			$(allNodes[i].classID).css("color", clickedColor);
		}else if(blockedNodes.includes(allNodes[i])){
			$(allNodes[i].classID).css("color", blockedColor);
		}else{
			$(allNodes[i].classID).css("color", clickableColor);
		}
	}

	cost = 120
	maskID = []
	for(var i=0; i< activeNodes.length; i++){
		cost += activeNodes[i].price
		if(activeNodes[i].key[vision].length == 1)
			maskID.push(activeNodes[i].key[vision][0])
	}

	costHTML.innerHTML = "TOTAL: $" + cost;


}

//		Checks to See if any Blocked Nodes are selected if so Current Node is unselectable		//
var cantSelected = function cantSelected(node){
	for (var i=0; i < node.blockedNodes[vision].length; i++){
		if (activeNodes.includes(node.blockedNodes[vision][i])){
			return true
		}
	}
	return false
}

//		Checks Too See if Nec Nodes are blocked              //
var necSelected = function necSelected(node){
	for (var i=0; i < node.necNodes[vision].length; i++){
		if (node.necNodes[vision][i].length > 1){
			// Checks for two nodes where either would be fine ex node bar and v1
			check = false
			for (var j = 0; j < node.necNodes[vision][i].length; j++){
				if (activeNodes.includes(node.necNodes[vision][i][j]))
					check = true
			}
			if (!check)
				return false
		}
		else if (!activeNodes.includes(node.necNodes[vision][i])){
			return false
		}
	}
	return true
}

//		Checks All togNodes and deactivates them when a togNode is Activated		//
var togSelected = function togSelected(api, node){
	// an = []
	// for (var i=0; i < activeNodes.length; i++){
	// 	if (!node.togNodes[vision].includes(activeNodes[i]) && activeNodes[i] != node){
	// 		an.push(activeNodes[i])
	// 	}else{
	// 		hideSet(api, activeNodes[i].key[vision])
	// 	}
	// }
	
	// activeNodes = an

	// IF NODE IS TOGGLE NODE REMOVE TOGGLE NODES FROM ACTIVE NODES AND HIDE THEM DO NOT BLOCK 
	if (node.togNodes[vision].length > 0){ 
		console.log(node.name + ": undergoing toggle check")
		for (var i = 0; i < node.togNodes[vision].length; i++){
			if (activeNodes.includes(node.togNodes[vision][i])){
				console.log(node.name + ": found toggle node -" + node.togNodes[vision][i].name + "- was active")
				activeNodes = activeNodes.filter(item => item !== node.togNodes[vision][i])
				hideSet(api, node.togNodes[vision][i].key[vision])
			}
		}
	}

}

// ***********	Main Function *********** //
var toggleNode = function toggleNode(api, classID, node){
	document.getElementById(classID).addEventListener('click',function(){
		//		If node is not blocked and all necessary accompanying nodes are selected as well as no blocking nodes are selected toggle Node  //
		if(!blockedNodes.includes(node) && !cantSelected(node) && necSelected(node)){
			//		If node is not already Activated =>   Toggle accompanying Nodes if needed and push current nodes to active nodes array		//
			if(!activeNodes.includes(node)){
				togSelected(api, node)
				showSet(api, node.key[vision])
				activeNodes.push(node)
				// Changing Basic Bar to Beck Bar
				if(node.name == 'beck'){
					hideSet(api, [430])
					if(activeNodes.includes(h808)){
						hideSet(api, h808.key[vision])
						h808.key[vision] = [115]
						showSet(api, h808.key[vision])
					}
					h808.key[vision] = [115]
				}
					
			}
			//		Else remove node from active nodes  	//
			else{
				hideSet(api, node.key[vision])
				activeNodes = activeNodes.filter(item => item !== node)
				// Reshowing Basic Bars
				if(node.name == 'beck'){
					showSet(api, [430])
					if(activeNodes.includes(h808)){
						hideSet(api, h808.key[vision])
						h808.key[vision] = [130]
						showSet(api, h808.key[vision])
					}
					h808.key[vision] = [130]
				}
			}
		}
		//		Run Refresh function to update the blocked nodes array		//
		refresh(api)
		console.log(activeNodes)
		console.log(blockedNodes)
	});
}

//		TOGGLES THE VISION FROM OPEN TO AGGRESSIVE AND VISE VERSA TAKES IN A 0 OR A 1 FOR OP/AG respectively 	//
var toggleVision = function toggleVision(api, classID, v){
	document.getElementById(classID).addEventListener('click',function(){
		hideSet(api, nodes)
		vision = v
		h808.key[vision] = [130]
		if(vision == OPEN){
			activeNodes = [h4, b3]
			showSet(api, [h4.key[vision][0], b3.key[vision][0]])
			permBlockedNodes = [h4, h3, d1, l3]
			changeColor("#open", clickedColor);
            changeColor("#agg", clickableColor);
			// 80
		}else if(vision == AGGRESSIVE){
			activeNodes = [h3, b3]
			showSet(api, [h3.key[vision][0], b3.key[vision][0]])
			permBlockedNodes = [h3, h808, jw]
			changeColor("#agg", clickedColor);
            changeColor("#open", clickableColor);
		}
		showSet(api, [430]) // In case of beck
		refresh(api)
		console.log(activeNodes)
		console.log(blockedNodes)
	});
}

var hideSet = function(api, nodeSet){
    for(var i=0;i<nodeSet.length;i++){
        api.hide(nodeSet[i]);
    }
}

var showSet = function(api, nodeSet){
    for(var i=0;i<nodeSet.length;i++){
        api.show(nodeSet[i]);
    }
}




var buttonEvents = function(api){
    hideSet(api, nodes);
	for(var i = 0; i < allNodes.length; i++){
		toggleNode(api, allNodes[i].name, allNodes[i]);
	}
	toggleVision(api, 'open', OPEN);
	toggleVision(api, 'agg', AGGRESSIVE);
	helmet(api)
}



var toggleClass = function(classHead,toggledClass,document){
    $(document).ready(function(){
        $(classHead).click(function(){
            $(".horizontals").hide();
            $(".verticals").hide();
            $(".diagonals").hide();
            $(".eyeguards").hide();
            $(".diagonals2").hide();
            $(".specialty").hide();
            $(".visions").hide();
            $(".visors").hide();
            $(".browbars").hide();
            $(toggledClass).show();
            changeColor("#horiz", clickableColor);
            changeColor("#vert", clickableColor);
            changeColor("#diag", clickableColor)
            changeColor("#eye", clickableColor);
            changeColor("#diag2", clickableColor);
            changeColor("#spe", clickableColor);
            changeColor("#vision", clickableColor)
            changeColor("#brow", clickableColor)
            changeColor("#visor", clickableColor)
            changeColor(classHead, clickedColor);
        });
    });
}

var success = function(api) {
    api.start(function() {
        api.addEventListener('viewerready', function() {
            buttonEvents(api);
            api.getNodeMap(function(err, nodes) {
                if (err) {
                    console.log('Error Loading Nodes');
                    return;
                }
                console.log(nodes);
            })
            api.getSceneGraph(function(err, result) {
                if (err) {
                    console.log('Error getting nodes');
                    return;
                }
                // get the id from that log
                console.log(result);
            });
        });
		paypal.Buttons({ 
			createOrder: function(data, actions) {
				return actions.order.create({
					purchase_units: [{
						amount: {
							value: cost
						},
						description: "Color: "+color+" | MaskID: " + maskID +" | Verify Mask ferrannoah.github.io"
					}]
				});
			},
			// Finalize the transaction
			onApprove: function(data, actions) {
				screenShot(api);
				return actions.order.capture().then(function(details) {
					// Show a success message to the buyer
					alert('Transaction completed by ' + details.payer.address.country_code + '!' + details.purchase_units[0].shipping.address.admin_area_1  ); 
					$(".paypal").hide();

				});
			}
		}).render('#paypal-button-container');
    }); 
};

var changeColor = function(classID, color){
    $(classID).css("color", color);
}

var beginToggle = function(classHead, document){
    $(document).ready(function(){
        $(classHead).click(function(){
            $("#eye").show();
            $("#brow").show();
            $("#spe").show();
            $("#visor").show();
            $("#diag").show();
            $("#diag2").show();
            $("#horiz").show();
            $("#vert").show();
            $("#placeholder").hide();
        });
    });
}

client.init( uid, {
    camera: false,
	internal: false,
	ui_infos: false,
	ui_controls: false,
	ui_stop: false,
    watermark: false,
    success: success,
    error: function onError() {
        console.log('Viewer Error');
    }
});

var submit = function(document){
	document.getElementById("submit").addEventListener('click', function(){
		$("#options").hide()
		$("#select").hide()
		$("#checkout").show()
		$("#co").show()
		$("#submit").hide()
	});
}

var helmet = function(api){
	document.getElementById("helmet_0").addEventListener('click', function(){
		$("#helmet_0").hide()
		$("#helmet_1").show()
		hideSet(api, helmet_nodes)
	})
	document.getElementById("helmet_1").addEventListener('click', function(){
		$("#helmet_1").hide()
		$("#helmet_0").show()
		showSet(api, helmet_nodes )
	})
}
var back = function(document){
	document.getElementById("back").addEventListener('click', function(){
		$("#options").show()
		$("#select").show()
		$("#checkout").hide()
		$("#submit").show()
		$("#co").hide()
	});
}

var checkout = function(document){
	document.getElementById("co").addEventListener('click', function(){

		var e = document.getElementById("color");
		color = e.options[e.selectedIndex].text;

		var ele = document.getElementsByName('shipping');
		for(i = 0; i < ele.length; i++) {
			if(ele[i].checked){
				shipping_cost =  parseInt(ele[i].value);
			}
		}

		if(color == "Select Color" || shipping_cost == -1){
			alert("Color or Shipping Option was not selected")
		}else{
			$("#options").hide()
			$("#select").hide()
			$("#checkout").hide()
			$("#helmet_0").hide()
			$("#helmet_1").hide()
			$("#submit").hide()
			$("#submit2").hide()
			$("#co").hide()
			$(".menu").hide()	
			$("#paypal").show()
			$("#cost2").show()
			$(".paypal").show()
			cost = cost + shipping_cost
			document.getElementById("cost2").innerHTML = "Final Total: $" + cost
		}

	});
}

$(document).ready(function(){
    changeColor("#error", clickableColor);
    $(".horizontals").hide();
    $(".verticals").hide();
    $(".diagonals").hide();
    $(".diagonals2").hide();
    $(".eyeguards").hide();
    $(".specialty").hide();
    $(".costClass").hide();
    $(".paypal").hide();
    $("#bar").hide();
    $("#sumbit").hide();
	$("#helmet_1").hide();
    $("#colorInput").hide();
    $("#colorText").hide();
    $("#maskID").hide();
    $("#eye").hide();
    $("#brow").hide();
    $("#spe").hide();
    $("#visor").hide();
    $("#diag").hide();
    $("#diag2").hide();
    $("#horiz").hide();
	$("#co").hide()
	$("#vert").hide();


    toggleClass("#horiz", ".horizontals", document);
    toggleClass("#vert", ".verticals", document);
    toggleClass("#diag", ".diagonals", document);
    toggleClass("#diag2", ".diagonals2", document);
    toggleClass("#eye", ".eyeguards", document);
    toggleClass("#spe", ".specialty", document);
    toggleClass("#vision", ".visions", document);
    toggleClass("#visor", ".visors", document);
    toggleClass("#brow", ".browbars", document);
    beginToggle("#open", document);
    beginToggle("#agg", document);
	submit(document);
	back(document);
	checkout(document);
});
