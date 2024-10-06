document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sampleForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            checkbox: form.checkbox.checked,
            radio: form.radio.value,
            text: form.text.value,
            color: form.color.value,
            select: form.select.value,
            date: form.date.value,
            range: form.range.value
        };

        console.log(formData);
    });
});