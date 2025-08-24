import clickerLogo from '../assets/clicker.png'

const allUpgrades = [
    {
        "upgradeID": 1,
        "upgradeIMG": clickerLogo,
        "upgradeCost": 10,
        "multiplicator": 1,
        "needUpgrade": 0
    },
    {
        "upgradeID": 2,
        "upgradeIMG": clickerLogo,
        "upgradeCost": 20,
        "multiplicator": 1,
        "needUpgrade": 1
    },
    {
        "upgradeID": 3,
        "upgradeIMG": clickerLogo,
        "upgradeCost": 40,
        "multiplicator": 2,
        "needUpgrade": 2
    },
    {
        "upgradeID": 4,
        "upgradeIMG": clickerLogo,
        "upgradeCost": 80,
        "multiplicator": 2,
        "needUpgrade": 3
    },
    {
        "upgradeID": 5,
        "upgradeIMG": clickerLogo,
        "upgradeCost": 160,
        "multiplicator": 3,
        "needUpgrade": 4
    },
    {
        "upgradeID": 6,
        "upgradeIMG": clickerLogo,
        "upgradeCost": 320,
        "multiplicator": 5,
        "needUpgrade": 5
    },
    {
        "upgradeID": 7,
        "upgradeIMG": clickerLogo,
        "upgradeCost": 640,
        "multiplicator": 8,
        "needUpgrade": 6
    },
    {
        "upgradeID": 8,
        "upgradeIMG": clickerLogo,
        "upgradeCost": 1280,
        "multiplicator": 12,
        "needUpgrade": 7
    }
]

function canUpgrade(currentUpgrades, neededUpgrade) {
    const upgr = getUpgrade(neededUpgrade);
    if (!upgr) return false;
    if (upgr.needUpgrade < 1) return true;
    if (currentUpgrades.includes(upgr.needUpgrade)) return true
    return false
}

function getUpgradesMultiplier(currentUpgrades) {
    if (!currentUpgrades || currentUpgrades.length < 1) return 1
    const defaultMulti = 1;
    let totalMulti = 0;
    currentUpgrades.forEach((upgr) => {
        const found = getUpgrade(upgr);
        if (found) {
            found.multiplicator > 0 ? totalMulti += found.multiplicator : null;
        }
    });

    return defaultMulti + totalMulti
}

function getUpgrade(ID) {
    const upgr = allUpgrades.find((x) => x.upgradeID == ID);
    if (upgr) {
        return upgr;
    } else {
        return null;
    }
}

export default { allUpgrades, canUpgrade, getUpgradesMultiplier, getUpgrade }