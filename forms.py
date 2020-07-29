from flask_wtf import Form
from wtforms import SelectField, SubmitField

class HoleForm(Form):

    courses = SelectField(
        'Course',
        choices=[(
            'lp', 'Lake Park'),
            #('sp', 'Stewart Peninsula'),
            #('cr', 'Coyote Ridge')
        ])

    # holes = SelectField('Hole', choices=['1R','2R','3R','4R','5R','6R','7R','8R','9R','10Y','11Y','12Y','13Y','14Y','15Y','16Y','17Y','18Y'])
    holes = SelectField('Hole', choices=['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'])
    submit = SubmitField("Get Yards to Center of Green")