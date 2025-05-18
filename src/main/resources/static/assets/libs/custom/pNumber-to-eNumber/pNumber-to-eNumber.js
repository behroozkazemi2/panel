function changeTextToPersian(text) {
    let values = '';
    let perKey = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let perVal = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (let i = 0; i < text.length; i++) {
        for (let ch = 0; ch < perKey.length; ch++) {
            if (text[i] == perKey[ch]) {
                values += perVal[ch];
                break;
            }
        }

    }

    return values;
}

function inputChange() {
    $(document).on('keydown', '.checkNumber', function (e) {
        let textNum = changeTextToPersian($(this).val());
        $(this).val(textNum);
    })

}

