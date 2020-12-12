from flask_wtf import Form
from wtforms import SelectField, SubmitField


class HoleForm(Form):

    courses = SelectField(
        'Course',
        choices=[
            ('lp', '-- Choose Course --'),
            ('lp', 'Lake Park 18'),
            ('lpe', 'Lake Park 9'),
            ('wcp', 'Watters Creek 9'),
            ('wct', 'Watters Creek 18'),
            ('dc', 'Duck Creek'),
            ('sp', 'Stewart Peninsula R/Y'),
            ('asp', 'San Pedro 9'),
            ('wc', 'Windcrest'),
            ('gctx', 'Golf Club of Texas'),
            ('cr', 'Coyote Ridge'),
            ('rc', 'Rebecca Creek'),
            ('wcd', 'Watters Creek 6'),
            ('crr', 'Coyote Ridge Range')
        ]
    )

    holes = SelectField('Hole', choices=['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'])
    submit = SubmitField("Get Yards-2-Green!")