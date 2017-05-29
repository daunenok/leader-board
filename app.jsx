var recentData, totalData;
var container = document.querySelector(".container");

class Leaderboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {campers: recentData};
	}

	total(event) {
		event.preventDefault();
		this.setState({campers: totalData});
		document.querySelectorAll(".past30").forEach(item => {
			item.classList.remove("active");
		});
		document.querySelectorAll(".alltime").forEach(item => {
			item.classList.add("active");
		});
	}

	recent(event) {
		event.preventDefault();
		this.setState({campers: recentData});
		document.querySelectorAll(".alltime").forEach(item => {
			item.classList.remove("active");
		});
		document.querySelectorAll(".past30").forEach(item => {
			item.classList.add("active");
		});
	}

	render() {
		var cams = this.state.campers;
		var linkItems = cams.map((camper) => "https://www.freecodecamp.com/" + camper.username);
		var tableItems = cams.map((camper, ind) =>
			<tr>
		  		<td>{ind + 1}</td>
		  		<td>
		  		<a href={linkItems[ind]}>
		  			{camper.username}
		  		</a>
		  		</td>
		  		<td className="past30 active">{camper.recent}</td>
		  		<td className="alltime">{camper.alltime}</td>
	  		</tr>
		);
		var element = 
			<table className="table table-striped">
				<caption><h1>Leaderboard</h1></caption>
				<thead>
					<tr>
						<th>#</th>
						<th>Camper Name</th>
						<th>
						<a href="#" onClick={this.recent.bind(this)}>
							Points in past 30 days
						</a>
						</th>
						<th>
						<a href="#" onClick={this.total.bind(this)}>
							All time points
						</a>
						</th>
					</tr>
				</thead>
				<tbody>
					{tableItems}
				</tbody>
			</table>;

		return (element);
	}
}

function getRecent() {
	fetch("https://fcctop100.herokuapp.com/api/fccusers/top/recent")
	.then(function(data) { return data.json(); })
	.then(function(data) { recentData = data; return data; })
	.then(function(data) { ReactDOM.render(<Leaderboard />, container); });
}

function getTotal() {
	fetch("https://fcctop100.herokuapp.com/api/fccusers/top/alltime")
	.then(function(data) { return data.json(); })
	.then(function(data) { 
		totalData = data;	
	});
}

getTotal();
getRecent();







