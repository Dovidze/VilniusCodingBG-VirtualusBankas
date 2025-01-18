export const validatePersonalCode = (personalCodeInput, setAlert) => {
    const showError = (message) => {
        setAlert({
            message: message,
            status: 'danger'
        });
    };

    const personalCodeDigits = personalCodeInput.trim().split('').map(Number);

    // Tikrina ar asmens kodas sudarytas tik iš skaičių
    if (!/^\d+$/.test(personalCodeInput)) {
        showError('Blogas asmens kodas (turi būti tik skaičiai)');
        return false;
    }

    // Tikrina ar asmens kodas susideda iš 11 skaitmenų
    if (personalCodeInput.length !== 11) {
        showError('Blogas asmens kodas (turi būti 11 skaitmenų)');
        return false;
    }

    // Pirmo skaitmens patikra 1-6
    const ADigit = personalCodeDigits[0];
    if (ADigit < 1 || ADigit > 6) {
        showError('Blogas asmens kodas (šimtmetis ir lytis)');
        return false;
    }

    // Tikrinami metai 00-99, jei 2000 tai 00-24
    const BDigit = personalCodeDigits[1];
    const CDigit = personalCodeDigits[2];
    if ((ADigit === 5 || ADigit === 6) && (BDigit < 0 || BDigit > 3)) {
        showError('Blogas asmens kodas (gim. metai)');
        return false;
    }
    if ((ADigit === 5 || ADigit === 6) && (CDigit < 0 || CDigit > 4)) {
        showError('Blogas asmens kodas (gim. metai)');
        return false;
    }

    // Tikrinamas mėnuo 01-12
    const DDigit = personalCodeDigits[3];
    const EDigit = personalCodeDigits[4];
    const DE = parseInt(`${DDigit}${EDigit}`, 10);
    if (DE === 0 || DE > 12) {
        showError('Blogas asmens kodas (gim. menuo)');
        return false;
    }

    // Randami metai INT pagal pirmąjį skaitmenį
    const yearString =
        ADigit === 1 || ADigit === 2 ? `18${BDigit}${CDigit}` :
        ADigit === 3 || ADigit === 4 ? `19${BDigit}${CDigit}` :
        `20${BDigit}${CDigit}`;
    const year = parseInt(yearString, 10);

    // Tikrinama ar teisinga diena pagal metus ir mėnesį
    const FDigit = personalCodeDigits[5];
    const GDigit = personalCodeDigits[6];
    const FG = parseInt(`${FDigit}${GDigit}`, 10);

    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    if (FG === 0 || FG > getDaysInMonth(year, DE)) {
        showError('Blogas asmens kodas (gim. diena)');
        return false;
    }

    // Eilės numerio tikrinimas 001-999
    const HDigit = personalCodeDigits[7];
    const IDigit = personalCodeDigits[8];
    const JDigit = personalCodeDigits[9];
    const HIJ = parseInt(`${HDigit}${IDigit}${JDigit}`, 10);

    if (HIJ === 0) {
        showError('Blogas asmens kodas (negali būti 3 nuliai gale)');
        return false;
    }

    // Paskutinio skaitmens tikrinimas
    const KDigit = personalCodeDigits[10];
    const sum1 = ADigit * 1 + BDigit * 2 + CDigit * 3 + DDigit * 4 + EDigit * 5 + FDigit * 6 + GDigit * 7 + HDigit * 8 + IDigit * 9 + JDigit * 1;
    const sum2 = ADigit * 3 + BDigit * 4 + CDigit * 5 + DDigit * 6 + EDigit * 7 + FDigit * 8 + GDigit * 9 + HDigit * 1 + IDigit * 2 + JDigit * 3;

    const liekanaSum1 = sum1 % 11;
    const liekanaSum2 = sum2 % 11;

    if ((liekanaSum1 !== 10 && KDigit !== liekanaSum1) ||
        (liekanaSum1 === 10 && KDigit !== liekanaSum2) ||
        (liekanaSum1 === 10 && liekanaSum2 === 10 && KDigit !== 0)) {
        showError('Blogas asmens kodas (paskutinis skaičius)');
        return false;
    }

    return true;
};
