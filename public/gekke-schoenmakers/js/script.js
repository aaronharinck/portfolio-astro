{

  const filterForm = document.querySelector('.filter-form');

  const init = () => {
    document.documentElement.classList.add('has-js');
    if (filterForm) {
      initFilterForm();
    }
  };

  const initFilterForm = () => {
    filterForm.addEventListener('change', handleFilterFormChange);

  };


  const handleFilterFormChange = async e => {
    e.preventDefault();
    submitFormWithJS();
  };

  const submitFormWithJS = async () => {
    const data = new FormData(filterForm);
    const entries = [...data.entries()];
    const qs = new URLSearchParams(entries).toString();
    const url = `${filterForm.getAttribute('action')}?${qs}`;

    const response = await fetch(url, {
      headers: new Headers({
        Accept: 'application/json'
      })
    });

    const activities = await response.json();

    updateEvents(activities);

    // update url
    window.history.pushState(
      {},
      '',
      `${window.location.href.split('?')[0]}?${qs}`
    );
  };

  const parseDate = mysqlDateString => {
    // Split timestamp into [ Y, M, D, h, m, s ]
    const t = mysqlDateString.split(/[- :]/);

    // Apply each element to the Date function
    return new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
  };

  const updateEvents = activities => {

    const $eventsParent = document.querySelector('.activities');
    $eventsParent.innerHTML = `<h2 class="hidden">De gekke gympies activiteiten</h2>`;
    console.log(activities)

    /* als er geen resultaten zijn gegeven voer dan deze code uit*/
    if (activities.length < 1) {
      console.log(`No results!`);
      $eventsParent.innerHTML += `<div class="content__container"><p class="subtitle">Er werden geen activiteiten gevonden<br> op basis van jouw gekke criteria.</p></div>`
    } else {

      activities.forEach(activity => {


        const date = parseDate(activity.date);
        const dateString = new Intl.DateTimeFormat('nl-BE', { day: "numeric", month: "long", year: "numeric" }).format(date);
        /*$eventsParent.innerHTML += `
        <section>
        <p class="xd"> ${activity.title} </p>
        </section>`*/

        /* als het het jaarlijske event is, geef andere opmaak*/
        if (activity.title === `The Craziest Catwalk`) {
          console.log(`YEARLY`);
          $eventsParent.innerHTML += `
          <section class="activity">
            <div class="activity__container activity__yearly-event">
                  <div class="activity__content">
                      <div class="activity__left">
                          <p class="activity__date">${dateString}</p>
                          <h3 class="activity__title"> ${activity.title}</h3>
                          <p class="activity__description"> ${activity.description}</p>
                          <a href="index.php?page=catwalk" class="button button--yellow button--white-shadow">Catwalk verkennen</a>
                      </div>   
                      <div class="activity__right">
                          <img src="assets/${activity.image}" class="activity__img" alt="${activity.title}" width="${activity.image_width}" height="${activity.image_height}">
                          <div class="activity__right__text">
                              <p class="activity__city">${activity.location_city}</p>
                              <p class="activity__place">${activity.location_place}</p>
                          </div>
                      </div>  
                  </div>  
              </div> 
            </section>`


        } else if (activity.location_country === `België`) {
          /* als de activiteit doorgaat in België een ander bg kleur geven*/
          $eventsParent.innerHTML += `
          <section class="activity">
            <div class="activity__container">
                  <div class="activity__content activity__content--blue">
                      <div class="activity__left">
                          <p class="activity__date">${dateString}</p>
                          <h3 class="activity__title"> ${activity.title}</h3>
                      </div>   
                      <div class="activity__right">
                          <img src="assets/${activity.image}" class="activity__img" alt="${activity.title}" width="${activity.image_width}" height="${activity.image_height}">
                          <div class="activity__right__text">
                              <p class="activity__city">${activity.location_city}</p>
                              <p class="activity__place">${activity.location_place}</p>
                          </div>
                      </div>  
                  </div>  
              </div> 
            </section>`
        } else {
          /* voor alle andere activiteiten*/
          $eventsParent.innerHTML += `
          <section class="activity">
            <div class="activity__container">
                  <div class="activity__content activity__content--yellow">
                      <div class="activity__left">
                          <p class="activity__date">${dateString}</p>
                          <h3 class="activity__title"> ${activity.title}</h3>
                      </div>   
                      <div class="activity__right">
                          <img src="assets/${activity.image}" class="activity__img" alt="${activity.title}" width="${activity.image_width}" height="${activity.image_height}">
                          <div class="activity__right__text">
                              <p class="activity__city">${activity.location_city}</p>
                              <p class="activity__place">${activity.location_place}</p>
                          </div>
                      </div>  
                  </div>  
              </div> 
            </section>`
        }




      })

    };
  }

  init();
}