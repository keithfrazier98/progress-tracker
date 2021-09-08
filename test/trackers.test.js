describe("trackers", () => {
  beforeEach(async () => {
    await page.goto("http://localhost:3000/");
  });

  it("loads sample trackers", async () => {
    await expect(page.$("#Play video games")).resolves.toBeDefined();
    await expect(page.$("#Eat apples")).resolves.toBeDefined();
    await page.screenshot({ path: "test-pictures/sample-trackers.png" });
  });

  it("edit button changes trackers to edit mode", async () => {
    await page.click("#edit");
    await page.screenshot({ path: "test-pictures/edit-trackers.png" });
    await expect(page.$$("select")).resolves.toHaveLength(5);
    await expect(page.$$("input")).resolves.toHaveLength(4);
  });

  it("edits and updates a tracker", async () => {
    //select edit mode
    await page.click("#edit");
    await page.screenshot({ path: "test-pictures/edit-trackers.png" });
    // set tracker type to Incremental
    await page.select("select[name=type]", "Incremental");
    await page.screenshot({
      path: "test-pictures/edit-trackers-occurance-manual.png",
    });
    //select goal of first tracker
    await page.click("input[name=goal]");
    await page.screenshot({
      path: "test-pictures/edit-trackers-goal-clicked.png",
    });
    //delete content and type '10'
    await page.keyboard.press("Backspace");
    await page.screenshot({
      path: "test-pictures/edit-trackers-goal-cleared.png",
    });
    await page.type("input[name=goal]", "10");
    await page.click("div#trackerContainer");
    await page.screenshot({
      path: "test-pictures/edit-trackers-goal-typed.png",
    });
    //set tracker occurence to manual
    await page.select("select[name=occurence]", "Weekly");
    await page.screenshot({
      path: "test-pictures/edit-trackers-occurance-manual.png",
    });

    await page.click("#edit");
    await page.screenshot({ path: "test-pictures/edit-trackers-finished.png" });
    await expect(page.$eval("h4", (el) => el.innerText)).resolves.toBe(
      "Play video games"
    );
    await expect(
      page.$eval("span#occurence", (el) => el.innerText)
    ).resolves.toBe("Weekly");
    await expect(page.$("div#IncrementalBtns")).resolves.toBeDefined();
    await expect(page.$eval("p#goal", (el) => el.innerText)).resolves.toBe(
      "10"
    );
  });

  afterAll(async () => {
    await browser.close;
  });
});
