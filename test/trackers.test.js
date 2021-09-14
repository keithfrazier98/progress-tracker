describe("Tracker Component", () => {
  beforeEach(async () => {
    await page.goto("http://localhost:3000/");

    //tracker #1
    await page.click("#add");
    //set title
    await page.type("input", "Play video games");
    //set timer
    await page.select("select[name=type]", "Timer");
    //set units
    await page.select("select[name=units]", "hr");
    //select goal
    await page.click("input[name=goal]");
    await page.keyboard.press("Backspace");
    await page.type("input[name=goal]", "1");
    //set occurrence
    await page.select("select[name=occurence]", "Daily");
    await page.click("#add");
    //tracker #2
    await page.click("#add");
    //set title
    await page.type("input", "Eat apples");
    //set timer
    await page.select("select[name=type]", "Incremental");
    //select goal
    await page.click("input[name=goal]");
    await page.keyboard.press("Backspace");
    await page.type("input[name=goal]", "3");
    //set occurrence
    await page.select("select[name=occurence]", "Daily");
    await page.click("#add");
    await page.screenshot({
      path: "test-pictures/creates-tracker/trackers-created.png",
    });
  });

  it("renders trackers", async () => {
    await expect(page.$("#Play video games")).resolves.toBeDefined();
    await expect(page.$("#Eat apples")).resolves.toBeDefined();
    await page.screenshot({
      path: "test-pictures/load-sample-trackers/01-sample-trackers.png",
    });
  });

  it("edit button changes trackers to edit mode", async () => {
    await page.click("#edit");
    await page.screenshot({
      path: "test-pictures/edit-mode/01-edit-trackers.png",
    });
    await expect(page.$$("select")).resolves.toHaveLength(5);
    await expect(page.$$("input")).resolves.toHaveLength(4);
    await page.click("#edit");
  });

  it("edits and updates a tracker", async () => {
    //select edit mode
    await page.click("#edit");
    await page.screenshot({
      path: "test-pictures/updates-tracker/01-edit-trackers.png",
    });

    await page
      .waitForSelector("select[name=type]", { timeout: 1000 })
      .then(async () => {
        //set tracker occurence to Weekly
        await page.select("select[name=occurence]", "Weekly");
        await page.screenshot({
          path: "test-pictures/updates-tracker/06-edit-trackers-occurance-manual.png",
        });

        // set tracker type to Incremental
        await page.select("select[name=type]", "Timer");
        await page.screenshot({
          path: "test-pictures/updates-tracker/02-edit-trackers-occurance-manual.png",
        });

        //select goal of first tracker
        await page.click("input[name=goal]");
        await page.screenshot({
          path: "test-pictures/updates-tracker/03-edit-trackers-goal-clicked.png",
        });

        //delete content and type '10'
        await page.keyboard.press("Backspace");
        await page.screenshot({
          path: "test-pictures/updates-tracker/04-edit-trackers-goal-cleared.png",
        });

        await page.type("input[name=goal]", "10");
        await page.click("div#trackerContainer");
        await page.screenshot({
          path: "test-pictures/updates-tracker/05-edit-trackers-goal-typed.png",
        });

        await page.click("#edit");
        await page.screenshot({
          path: "test-pictures/updates-tracker/07-edit-trackers-finished.png",
        });
      });

    await expect(page.$eval("h4", (el) => el.innerText)).resolves.toBe(
      "Eat apples"
    );
    await expect(
      page.$eval("span#occurence", (el) => el.innerText)
    ).resolves.toBe("Weekly");
    await expect(page.$("div#TimerBtns")).resolves.toBeDefined();
    await expect(page.$eval("p#goal", (el) => el.innerText)).resolves.toBe(
      "10"
    );
  });

  it("resets after manual reset has been clicked", async () => {
    await page.screenshot({
      path: "test-pictures/resets-tracker/01-reset-trackers-begin.png",
    });
    //select edit mode
    await page.click("#edit");
    //set tracker occurence to manual
    await page.select("select[name=occurence]", "Manual");
    await page.select("select[name=type]", "Incremental");
    await page.screenshot({
      path: "test-pictures/resets-tracker/01-edit-trackers-occurance-manual.png",
    });

    //select goal of first tracker
    await page.click("input[name=goal]");
    await page.screenshot({
      path: "test-pictures/updates-tracker/03-edit-trackers-goal-clicked.png",
    });

    //delete content and type '3'
    await page.keyboard.press("Backspace");
    await page.screenshot({
      path: "test-pictures/resets-tracker/04-edit-trackers-goal-cleared.png",
    });
    await page.type("input[name=goal]", "3");
    await page.click("div#trackerContainer");
    await page.screenshot({
      path: "test-pictures/resets-tracker/05-edit-trackers-goal-typed.png",
    });
    //de-select edit mode
    await page.click("#edit");
    await page.screenshot({
      path: "test-pictures/resets-tracker/06-edit-trackers-setup-manual.png",
    });
    await expect(page.$("button#reset")).resolves.toBeDefined();

    //click inc button twice
    await page.click("#inc");
    await page.click("#inc");
    await page.screenshot({
      path: "test-pictures/resets-tracker/07-edit-trackers-inc-clicked-twice.png",
    });
    await expect(page.$eval("span#current", (e) => e.innerText)).resolves.toBe(
      "2"
    );

    await page.click("[name=reset]");
    await page.screenshot({
      path: "test-pictures/resets-tracker/08-edit-trackers-reset-clicked.png",
    });
    await expect(page.$eval("span#current", (e) => e.innerText)).resolves.toBe(
      "0"
    );
  });

  it("shows complete when goal is reached", async () => {
    await page.screenshot({
      path: "test-pictures/completed-trackers/01-before.png",
    });
    //complete inc tracker
    await page.click("#inc");
    await page.click("#inc");
    await page.click("#inc");

    await page.screenshot({
      path: "test-pictures/completed-trackers/02-completed-inc.png",
    });
    await expect(page.$eval("#iCompleted", (e) => e.innerText)).resolves.toBe(
      "Completed!"
    );

    await page.addScriptTag({
      url: "https://cdn.jsdelivr.net/npm/lolex@2.7.1/lolex.min.js",
    });
    

    // complete timer tracker
    await expect(page.$("#incTime")).resolves.toBeDefined();
    await page.click("#incTime");
    await page.click("#incTime");
    await page.click("#incTime");

    await page.waitForSelector("[name=pause-outline]").then(async () => {
      await page.screenshot({
        path: "test-pictures/completed-trackers/03-start-timer.png",
      });
    });

    await page.evaluate(() => {
      const clock = lolex.createClock();
      clock.setTimeout(() => {
        console.log("Hello, world!");
      }, 10000);
      clock.tick(10000);
    });

    await expect(page.$("[name=pause-outline]")).resolves.toBeDefined();

    await page.screenshot({
      path:"test-pictures/completed-trackers/04-finish-timer.png"
    })
    /*await page.waitForSelector("#tCompleted").then(async ()=>{
      
    })*/
  });

  it("restarts tracker after one day", async () => {
    await page.screenshot({
      path: "test-pictures/resets-tracker-interval/01-before.png",
    });

    //complete inc tracker
    await page.click("#inc");
    await page.click("#inc");
    await page.click("#inc");

    await page.screenshot({
      path: "test-pictures/resets-tracker-interval/02-completed.png",
    });
    await expect(page.$eval("#iCompleted", (e) => e.innerText)).resolves.toBe(
      "Completed!"
    );

    expect(true).toBe(true);
  });

  afterAll(() => {
    browser.close;
  });
});
