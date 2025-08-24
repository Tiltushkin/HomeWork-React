import React, { useState } from 'react'
import s from './Clicker.module.scss'
import clickerLogo from '../../assets/clicker.png'
import secretary from '../../utils/secretary'
import Button from '../../UI/Buttons/Button'

function Clicker() {
    const [money, setMoney] = useState(0)
    const [clicks, setClicks] = useState(0)
    const [upgrades, setUpgrades] = useState([])

    function calcMoney() {
        return (1 * secretary.getUpgradesMultiplier(upgrades))
    }

    function addMoney() {
        const addedMoney = calcMoney();
        setMoney(money + addedMoney)
        setClicks(clicks + 1)
    }

    function buyUpgrade(upgradeID) {
        const found = secretary.getUpgrade(upgradeID);
        if (found) {
            if (money < found.upgradeCost) return;
            if (upgrades.includes(upgradeID)) return;

            const newUpgrades = upgrades;
            newUpgrades.push(upgradeID);

            setUpgrades(newUpgrades)
            setMoney(money - found.upgradeCost)
        } else {
            return console.error("Upgrade not found!")
        }
    }

    function haveUpgrade(ID) {
        return upgrades.includes(ID);
    }

    function clearClicks() {
        setClicks(0);
    }

    function clearProgress() {
        setMoney(0);
        setClicks(0);
        setUpgrades([]);
    }

    return (
        <div className={s.wrapper}>
            <h2 className={s.wrapper__title}>Clicker</h2>
            <img className={s.wrapper__clickerIMG} src={clickerLogo} alt="clicker icon" loading={'lazy'} onClick={addMoney} />
            <p className={s.wrapper__currentMoney}>Money: { money }$</p>
            <p className={s.wrapper__currentClicks}>Clicks: { clicks }</p>
            <p className={s.wrapper__currentMulti}>Current Multiplicator: { secretary.getUpgradesMultiplier(upgrades) }</p>
            <div className={s.clearButtons}>
                <Button onClick={() => clearClicks()}>Clear clicks</Button>
                <Button onClick={() => clearProgress()}>Clear progress</Button>
            </div>
            <h2 className={s.wrapper__shop_title}>Upgrades</h2>
            <div className={s.upgradesBox}>
                {secretary.allUpgrades.map((upgr) => (
                    <div className={s.upgradesBox__upgr} key={upgr.upgradeID} style={ upgr.upgradeIMG ? { backgroundImage: `url(${upgr.upgradeIMG})` } : { backgroundImage: "none" } }>
                        <p className={s.upgradesBox__upgr__cost}>Cost: {upgr.upgradeCost}$</p>
                        <p className={s.upgradesBox__upgr__multi}>Multiplier: +{upgr.multiplicator}</p>
                        <Button onClick={() => buyUpgrade(upgr.upgradeID)} disabled={!secretary.canUpgrade(upgrades, upgr.upgradeID) || money < upgr.upgradeCost || haveUpgrade(upgr.upgradeID)}>{ !haveUpgrade(upgr.upgradeID) ? 'Buy' : 'Purchased' }</Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Clicker