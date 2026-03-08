function initializeCheatsElement() {
    let cheats = [
        { name: "Invincibility", type: "toggle", reference: "playerInvincible" },
        { name: "Flight Mode", type: "toggle", reference: "playerFlightMode" },
        { name: "Stop Collisions", type: "toggle", reference: "stopCollisions" },
        { name: "Global Wall Jump", type: "toggle", reference: "playerGlobalWallJump" },
        { name: "Show Wireframes", type: "toggle", reference: "showWireframes" },
        { name: "Force Object Visibility", type: "toggle", reference: "forceVisibility" },
        { name: "Auto-Skip Cutscenes", type: "toggle", reference: "autoSkipCutscenes" },
        { name: "Prevent Level Completion", type: "toggle", reference: "stopLevelComplete" },
        { name: "Locked Player Camera", type: "toggle", reference: "lockedPlayerCamera" },
        { name: "Hide Background", type: "toggle", reference: "hideBackground" },
        { name: "Speed Multiplier", type: "input", reference: "playerSpeedMultiplier", defaultValue: 1 },
        { name: "Jump Multiplier", type: "input", reference: "playerJumpMultiplier", defaultValue: 1 },
        { name: "Player Width", type: "input", reference: "playerWidth", defaultValue: 40 },
        { name: "Player Height", type: "input", reference: "playerHeight", defaultValue: 40 },
        { name: "Player Type", type: "text", reference: "playerType", defaultValue: "player" },
        { name: "Blue Cube Collected", type: "blueCubeToggle", reference: "blueCube" },
        { name: "Red Cube Collected", type: "redCubeToggle", reference: "redCube" }

    ];

    let div = document.createElement("div");
    div.id = "cheats";
    div.style.position = "absolute";
    div.style.width = "300px";
    div.style.height = "400px";
    div.style.left = "100px";
    div.style.top = "100px";
    div.style.fontFamily = "rubik";
    div.style.fontSize = "20px";
    div.style.background = "rgb(255,100,100)";
    div.style.borderRadius = "4px";
    div.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
    div.style.overflow = "hidden";
    div.style.userSelect = "none";
    div.style.display = "none";
    div.style.resize = "none";

    let icon = document.createElement("img");
    icon.src = "../assets/cheats-icon.png";
    icon.width = 20;
    icon.height = 20;
    icon.style.position = "absolute";
    icon.style.marginTop = "3px";
    icon.style.marginLeft = "-5px";

    let span = document.createElement("span");
    span.innerHTML = "Cheats";
    span.style.marginLeft = "20px";

    let header = document.createElement("div");
    header.style.fontWeight = "bold";
    header.style.background = "rgb(200,50,50)";
    header.style.padding = "8px";
    header.style.cursor = "grab";
    header.style.height = "20px";
    header.style.userSelect = "none";
    header.appendChild(icon);
    header.appendChild(span);
    div.appendChild(header);

    let content = document.createElement("div");
    content.style.padding = "10px";
    content.style.border = "5px solid rgb(200,50,50)";
    content.style.borderWidth = "0px 5px 5px 5px";
    content.style.boxSizing = "border-box";
    content.style.width = "100%";
    content.style.height = "calc(100% - 35px)";
    content.style.overflowY = "auto";
    content.style.overflowX = "hidden";
    content.style.scrollbarWidth = "thin";

    for (let o of cheats) {
        if (o.type === "toggle") content.appendChild(createCheatItemElement(o));
        else if (o.type === "input") content.appendChild(createCheatInputElement(o));
        else if (o.type === "text") content.appendChild(createCheatTextInputElement(o));
        else if (o.type === "blueCubeToggle") content.appendChild(createBlueCubeToggleElement(o));
        else if (o.type === "redCubeToggle") content.appendChild(createRedCubeToggleElement(o));
    }

    div.appendChild(content);

    let resizer = document.createElement("div");
    resizer.style.position = "absolute";
    resizer.style.right = "0";
    resizer.style.bottom = "0";
    resizer.style.width = "16px";
    resizer.style.height = "16px";
    resizer.style.cursor = "nwse-resize";
    resizer.style.background = "rgba(0,0,0,0.2)";
    resizer.style.borderTop = "2px solid rgba(0,0,0,0.3)";
    resizer.style.borderLeft = "2px solid rgba(0,0,0,0.3)";
    resizer.style.borderRadius = "0 0 4px 0";
    div.appendChild(resizer);

    document.body.appendChild(div);

    let isDragging = false;
    let offsetX, offsetY;

    header.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - div.offsetLeft;
        offsetY = e.clientY - div.offsetTop;
        header.style.cursor = "grabbing";
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;
        div.style.left = e.clientX - offsetX + "px";
        div.style.top = e.clientY - offsetY + "px";
    }

    function onMouseUp() {
        isDragging = false;
        header.style.cursor = "grab";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    }

    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    resizer.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(div).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(div).height, 10);
        document.addEventListener("mousemove", doResize);
        document.addEventListener("mouseup", stopResize);
    });

    function doResize(e) {
        if (!isResizing) return;
        div.style.width = startWidth + (e.clientX - startX) + "px";
        div.style.height = startHeight + (e.clientY - startY) + "px";
    }

    function stopResize() {
        isResizing = false;
        document.removeEventListener("mousemove", doResize);
        document.removeEventListener("mouseup", stopResize);
    }

    updateCheatsVisibility();
}

function createCheatItemElement(o) {
    let span = document.createElement("span");
    span.innerHTML = o.name;

    let div = document.createElement("div");
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "space-between";
    div.style.marginBottom = "10px";

    div.appendChild(span);
    div.appendChild(createToggle({
        initialState: false,
        onToggle: (state) => {
            game.level[o.reference] = state;
        }
    }));

    return div;
}

function createCheatTextInputElement(o) {
    let label = document.createElement("span");
    label.innerHTML = o.name;

    let input = document.createElement("input");
    input.type = "text"; // <-- text input
    input.style.width = "150px";
    input.style.marginLeft = "10px";
    input.style.border = "2px solid black";
    input.style.borderRadius = "4px";
    input.style.background = "rgb(240,240,240)";
    input.style.fontSize = "16px";
    input.style.textAlign = "center";

    // Set default value if provided
    input.value = o.defaultValue !== undefined ? o.defaultValue : "";
    game.level[o.reference] = input.value;

    input.addEventListener("input", () => {
        game.level[o.reference] = input.value;
    });

input.addEventListener("input", () => {
    let val = input.value;
    let player = game.objects.objects.find(p => p.type === "player");
    if (player) {
        if (o.reference === "playerType") player.type = val; 
    }
    game.level[o.reference] = val; 
});

    let div = document.createElement("div");
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "space-between";
    div.style.marginBottom = "10px";

    div.appendChild(label);
    div.appendChild(input);
    return div;
}

function createBlueCubeToggleElement(o) {
    let span = document.createElement("span");
    span.innerHTML = o.name;

    let div = document.createElement("div");
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "space-between";
    div.style.marginBottom = "10px";

    let cube = game.objects.objects.find(p => p.type === "cube" && p.color === "blue");
    let initialState = cube ? !!cube.collected : false;
    game.level[o.reference] = initialState;

    div.appendChild(span);
    div.appendChild(createToggle({
        initialState: initialState,
        onToggle: (state) => {
            let cube = game.objects.objects.find(p => p.type === "cube" && p.color === "blue");
            if (!cube) return;

            if (state) {
                if (!cube.collected) {
                    game.level.discoverBlueCube();
                    game.level.collectCube(cube);
                }
            } else {
                cube.collected = false;
                saveData.blueCubesCollected[game.level.level] = false;
                updateSaveData();
            }

            game.level[o.reference] = state;
        }
    }));

    return div;
}

function createRedCubeToggleElement(o) {
    let span = document.createElement("span");
    span.innerHTML = o.name;

    let div = document.createElement("div");
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "space-between";
    div.style.marginBottom = "10px";

    let cube = game.objects.objects.find(p => p.type === "cube" && p.color === "red");
    let initialState = cube ? !!cube.collected : false;
    game.level[o.reference] = initialState;

    div.appendChild(span);
    div.appendChild(createToggle({
        initialState: initialState,
        onToggle: (state) => {
            let cube = game.objects.objects.find(p => p.type === "cube" && p.color === "red");
            if (!cube) return;

            if (state) {
                if (!cube.collected) {
                    game.level.discoverRedCube();
                    game.level.collectCube(cube);
                }
            } else {
                cube.collected = false;
                saveData.redCubesCollected[game.level.level] = false;
                updateSaveData();
            }

            game.level[o.reference] = state;
        }
    }));

    return div;
}

function createCheatInputElement(o) {
    let label = document.createElement("span");
    label.innerHTML = o.name;

    let input = document.createElement("input");
    input.type = "number";
    input.style.width = "80px";
    input.style.marginLeft = "10px";
    input.style.border = "2px solid black";
    input.style.borderRadius = "4px";
    input.style.background = "rgb(240,240,240)";
    input.style.fontSize = "16px";
    input.style.textAlign = "center";

    input.value = o.defaultValue !== undefined ? o.defaultValue : 0;
    game.level[o.reference] = parseFloat(input.value);

    input.addEventListener("input", () => {
        let val = parseFloat(input.value);
        if (!isNaN(val)) {
            game.level[o.reference] = val;
        }
    });

    input.addEventListener("input", () => {
        let val = parseFloat(input.value);
        if (!isNaN(val)) {
            let player = game.objects.objects.find(p => p.type === "player");
            if (player) {
                if (o.reference === "playerWidth") player.w = val;
                if (o.reference === "playerHeight") player.h = val;
            }
        }
    });

    let div = document.createElement("div");
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "space-between";
    div.style.marginBottom = "10px";

    div.appendChild(label);
    div.appendChild(input);
    return div;
}

function hideCheatsElement() {
    document.getElementById("cheats").style.display = "none";
}

function showCheatsElement() {
    document.getElementById("cheats").style.display = "block";
}

function updateCheatsVisibility() {
    if (!menu.titleScreen && !menu.creditsScreen && saveData.showCheatsMenu && saveData.cheatsActivated) {
        showCheatsElement();
    } else {
        hideCheatsElement();
    }
}

function createToggle(options = {}) {
    const {
        initialState = false,
        onToggle = (state) => { }
    } = options;

    let width = 50;
    let height = 30;

    let toggle = document.createElement("div");
    toggle.style.display = "inline-block";
    toggle.style.verticalAlign = "middle";
    toggle.style.position = "relative";
    toggle.style.width = width + "px";
    toggle.style.height = height + "px";
    toggle.style.border = "4px solid black";
    toggle.style.boxSizing = "border-box";
    toggle.style.borderRadius = height / 2 + "px";
    toggle.style.transition = "border 0.1s, transform 0.05s ease";

    let circle = document.createElement("div");
    let circleSize = height - 16;
    circle.style.width = circleSize + "px";
    circle.style.height = circleSize + "px";
    circle.style.background = "black";
    circle.style.borderRadius = "50%";
    circle.style.position = "absolute";
    circle.style.top = "4px";
    circle.style.transition = "left 0.1s, background 0.1s, transform 0.05s ease";

    toggle.style.borderColor = initialState ? "rgb(0,0,0)" : "rgb(100,50,50)";
    circle.style.transform = initialState ? "scale(1.1)" : "scale(0.9)";
    circle.style.left = initialState ? width - circleSize - 12 + "px" : "4px";
    circle.style.backgroundColor = initialState ? "rgb(0,0,0)" : "rgb(100,50,50)";

    toggle.appendChild(circle);

    let state = initialState;
    toggle.addEventListener("click", () => {
        state = !state;
        circle.style.transform = state ? "scale(1.1)" : "scale(0.9)";
        circle.style.left = state ? width - circleSize - 12 + "px" : "4px";
        toggle.style.borderColor = state ? "rgb(0,0,0)" : "rgb(100,50,50)";
        circle.style.backgroundColor = state ? "rgb(0,0,0)" : "rgb(100,50,50)";
        onToggle(state);
        audios.menuClick.currentTime = 0;
        audios.menuClick.play();

        toggle.style.transform = "scale(0.9)";
        setTimeout(() => {
            toggle.style.transform = "scale(1)";
        }, 50);
    });

    return toggle;
}
