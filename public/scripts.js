var SplashScreen = React.createClass({
  render: function() {
    return (
      <div id="splash-screen" className="section">
        <span className="inner-text">
          <span className="keyword">Hello</span>, I&#39;m David.
        </span>

        <a href="#maker-of-things" className="next-section">
          <span className="icon-arrow-down"></span>
          <span>More</span>
        </a>
      </div>
    );
  }
});

var KeywordSection = React.createClass({
  render: function() {
    return (
      <div id={ this.props.wrapperID } className="section">
        <span className="inner-text"> { this.props.innerText } </span>
        <span className="keyword"> { this.state.keyword } </span>

        <a href={ this.props.nextSection } className="next-section">
          <span className="icon-arrow-down"></span>
          <span>More</span>
        </a>
      </div>
    );
  },

  getInitialState: function() {
    var words = this.props.words;
    return {words: words, index: 0, keyword: words[0]};
  },

  updateKeyword: function() {
    var next_index = this.state.index + 1
    var new_word = this.state.words[next_index % this.state.words.length];

    this.setState({index: next_index, keyword: new_word });
  },

  componentDidMount: function() {
    this.updateKeyword();
    setInterval(this.updateKeyword, 1000);
  },
});

var ProjectsMade = React.createClass({
  render: function() {
    var projects = [];
    this.state.projects.forEach(function(project) {
      projects.push(
        <a key={ project.id } target="_blank" href={ project.project_url }>
          <style>{'\
            #' + project.slug + '{ background: url('+ project.image_url + '); }\
            #' + project.slug + ':hover { background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(' + project.image_url + '); }\
          '}</style>
          <li id={ project.slug } className="projects">
            <p> { project.end_date }, { project.project_type } </p>
            <h2> { project.name } </h2>
            <p className="tags"> Skills: { project.skills }</p>
          </li>
        </a>
      );
    });

    return (
      <div id="things-made" className="section">
        <span className="inner-text"> Here are some things I&#39;ve made.</span>

        <ul id="project-wrapper">
          { projects }
        </ul>

        <a href="#details" className="next-section">
          <span className="icon-arrow-down"></span>
          <span>More</span>
        </a>
      </div>
    );
  },

  componentDidMount: function() {
    $('#project-wrapper').bxSlider({
      minSlides: 1,
      maxSlides: 4,
      controls: true,
      speed: 700,
      mode: 'horizontal',
      slideWidth: 260,
      slideMargin: 0,
      pager: false,
      captions: false,
      infiniteLoop: true
    });
  },

  getInitialState: function() {
    var projects = [
      {
        id: 1,
        slug: "potato-ship",
        image_url: "/potato-ship.jpg",
        project_url: "https://github.com/collettiquette/potato_ship",
        end_date: "October 2014",
        project_type: "Personal",
        name: "Potato Ship",
        skills: "Ruby on Rails, Javascript, Websockets",
      },
      {
        id: 2,
        slug: "how-epic",
        image_url: "/how-epic.jpg",
        project_url: "http://www.howepic.net",
        end_date: "August 2014",
        project_type: "Personal",
        name: "How Epic",
        skills: "Ruby on Rails, Javascript, API",
      },
      {
        id: 3,
        slug: "jurnl",
        image_url: "/jurnl-cover.jpg",
        project_url: "https://github.com/dhahn/Jurnl",
        end_date: "December 2013",
        project_type: "Personal",
        name: "Jurnl",
        skills: "Ruby on Rails, Javascript, Postgres",
      },
      {
        id: 4,
        slug: "fridge",
        image_url: "/fridge-cover.jpg",
        project_url: "https://github.com/dhahn/r13-team-45",
        end_date: "October 2013",
        project_type: "Personal",
        name: "Fridge",
        skills: "Ruby on Rails, Javascript, Postgres",
      },
    ];

    return {projects: projects};
  },
});

var DetailSection = React.createClass({
  render: function() {

    var details = [];
    this.state.details.forEach(function(detail) {
      details.push(
        <a key={ detail.id } target="_blank" href={ detail.url }>
          <li className="icon">
            <span className={ detail.projectName }></span>
          </li>
        </a>
      );
    });

    return (
      <div id="details" className="section">
        <span className="inner-text"> Everything else. </span>
        <ul className="icon-wrapper">
          { details }
        </ul>
      </div>
    );
  },

  getInitialState: function() {
    var details = [
      {
        id: 1,
        url: "https://twitter.com/extremedavidh",
        projectName: "icon-twitter",
      },
      {
        id: 2,
        url: "https://github.com/dhahn",
        projectName: "icon-github",
      },
      {
        id: 3,
        url: "https://www.facebook.com/davidmhahn",
        projectName: "icon-facebook",
      },
      {
        id: 4,
        url: "https://www.linkedin.com/pub/david-hahn/78/438/448",
        projectName: "icon-linkedin2",
      },
      {
        id: 5,
        url: "http://www.pandora.com/profile/davidmichaelhahn",
        projectName: "icon-headphones",
      },
      {
        id: 6,
        url: "#still-to-come",
        projectName: "icon-pencil",
      },
      {
        id: 7,
        url: "mailto:davidmichaelhahn@gmail.com",
        projectName: "icon-mail",
      },
      {
        id: 8,
        url: "https://www.google.com/calendar/embed?src=david%4040digits.com&ctz=America/Chicago",
        projectName: "icon-calendar",
      },
    ];

    return { details: details };
  }
});

var HomePage = React.createClass({
  render: function() {
    return (
      <div>
        <SplashScreen />
        <KeywordSection wrapperID="maker-of-things" nextSection="#make-things-with" innerText="I'm a maker of" words={ JSON.parse(window.config.maker_words) }/> 
        <KeywordSection wrapperID="make-things-with" nextSection="#things-made" innerText="I make things with" words={ JSON.parse(window.config.tools_words) }/> 
        <ProjectsMade />
        <DetailSection />
      </div>
    );
  },

  componentDidMount: function() {
    $(document).on('click', 'a[href^="#"]', function (e) {
      e.preventDefault();

      var target = this.hash;
      var $target = $(target);

      $('html, body').stop().animate({
        'scrollTop': $target.offset().top
      }, 800, 'swing', function () {});
    });
  }
});

React.render(
  <HomePage />,
  document.getElementById('content')
);