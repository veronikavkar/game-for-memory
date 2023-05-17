document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const titleNumber = document.querySelector(".title__desired-number");
  const mainBox = document.querySelector(".memory-game");
  const btnBox = document.querySelector(".memory-game__bottom");

  // Data
  let answers = [];
  const levelsLength = 5;
  const levelsParams = [
    {
      buttonAmount: 6,
      buttonWidth: "200px",
      buttonHeight: "100px",
    },
    {
      buttonAmount: 9,
      buttonWidth: "200px",
      buttonHeight: "100px",
    },
    {
      buttonAmount: 12,
      buttonWidth: "150px",
      buttonHeight: "70px",
    },
    {
      buttonAmount: 16,
      buttonWidth: "140px",
      buttonHeight: "60px",
    },
    {
      buttonAmount: 16,
      buttonWidth: "140px",
      buttonHeight: "60px",
    },
  ];

  // Methods
  /**
   * Generates random number.
   *
   * @param {number} maxNumber The maximum number.
   * @return {number} Random number.
   */
  const getRandomNumber = (maxNumber = 100) =>
    Math.floor(Math.random() * maxNumber);

  /**
   * Generates array of random numbers.
   *
   * @param {number} desiredNumber The desired number.
   * @param {number} arrayLength The length of returing array.
   * @return {number} Returns array of shuffle random numbers and desired number.
   */
  const getRandomNumbers = (desiredNumber, arrayLength = 6) => {
    let result = [desiredNumber];
    [...Array(arrayLength - 1).keys()].forEach(() => {
      let number = Math.floor(Math.random() * 100);
      result.push(number);
    });
    // Shuffle numbers
    return result.sort(() => 0.5 - Math.random());
  };

  /**
   * Set boolean value to answers.
   *
   * @param {number} desiredNumber Desired number.
   * @param {number} selectedNumber The selected number.
   */
  const setAnswer = (desiredNumber, selectedNumber) => {
    answers.push(selectedNumber === desiredNumber);

    const isAllAnswered = answers.length === levelsLength;
    if (isAllAnswered) {
      setResultPage();
      return;
    }

    selectedNumber === desiredNumber ? setSuccess() : setFail();
  };

  /**
   * Add success class to page and delete after delay.
   */
  const setSuccess = () => {
    mainBox.classList.add("memory-game--success");
    setTimeout(() => mainBox.classList.remove("memory-game--success"), 250);
  };

  /**
   * Add fail class to page and delete after delay.
   */
  const setFail = () => {
    mainBox.classList.add("memory-game--fail");
    setTimeout(() => mainBox.classList.remove("memory-game--fail"), 250);
  };

  /**
   * Add result class to page and html with results.
   */
  const setResultPage = () => {
    const correctAnswers = answers.filter((answer) => answer).length;
    mainBox.classList.add("memory-game--result");
    mainBox.innerHTML += `<div class='results'><span class='result-title'>Ваши результаты</span>
		<span class='result-text'>Текущий результат: ${correctAnswers} из ${answers.length}</span>
		<button class='repeat-btn'>Пройти еще раз</button></div>`;

    const repeatBtn = document.querySelectorAll(".repeat-btn");

    repeatBtn.forEach((item) => {
      item.addEventListener("click", function (event) {
        repeat();
      });
    });
  };

  /**
   * Reload page.
   */
  const repeat = () => {
    window.location.reload();
  };

  /**
   * Initialize all numbers on page.
   */
  const initNumbersOnPage = () => {
    const desiredNumber = getRandomNumber();

    const currentLevelParameter = levelsParams[answers.length];

    let result = "";
    getRandomNumbers(
      desiredNumber,
      currentLevelParameter?.buttonAmount
    ).forEach((number) => {
      result += `<button value="${number}" style="
			width: ${currentLevelParameter?.buttonWidth};
			height: ${currentLevelParameter?.buttonHeight};"	
			 class="number-btn shakeAnimation heartbeat pulsate-fwd shake-bottom ">${number}</button>`;
    });

    titleNumber.innerText = desiredNumber;
    btnBox.innerHTML = result;

    const numberBtns = document.querySelectorAll(".number-btn");

    numberBtns.forEach((numberBtn) => {
      numberBtn.addEventListener("click", function (event) {
        setAnswer(desiredNumber, Number(event.target.value));
        initNumbersOnPage();
      });
    });
  };

  initNumbersOnPage();
});
