let frequency = {
  0: 'daily',
  1: 'weekly',
  2: 'bi - weekly',
  3: 'monthly',
  4: 'quaterly',
  5: 'bi - annually',
  6: 'anually'
};
export default [
  {
    id: 1,
    title: 'Monthly Boiler PM Checksheet',
    machine_name: 'Boiler',
    WO_number: '',
    frequency: 'monthly',
    // technician_name: 'A.Brown',
    // supervisor: 'A.Simpson',
    // date: new Date(2019, 11, 24, 14, 31),
    // start_time: '',
    // completion_time:'',

    checks: [
      {
        id: 1,
        title: 'Inspect Ignition electrode',
        status: 'NOT_OK',
        value: null
      },
      {
        id: 2,
        title: 'Inspect Flame Sensor',
        status: 'NOT_OK',
        value: null
      },
      {
        id: 3,
        title:
          'Inspect control panel for loose connnections; check all terminals/connetions',
        status: 'NOT_OK',
        value: null
      },
      {
        id: 4,
        title: 'Inspect mechanical float switch',
        status: 'NOT_OK',
        value: null
      },
      {
        id: 5,
        title: 'Clean water pump strainer',
        status: 'NOT_OK',
        value: null
      },
      {
        id: 6,
        title: 'Record the running current of the pump',
        status: 'NOT_OK',
        value: null
      },
      {
        id: 7,
        title: 'Record the running current of the blower motor',
        status: 'NOT_OK',
        value: null
      },
      {
        id: 8,
        title: 'Record running hours',
        status: 'NOT_OK',
        value: null
      }
    ],
    response: [
      {
        id: 1,
        date: new Date(2019, 11, 24, 13, 31),
        machine_name: 'Boiler',
        technician_name: 'A.Brown',
        supervisor: 'A.Simpson',
        start_time: '',
        completion_time: '',
        responses: [
          {
            check_id: 1,
            title: 'Inspect Ignition electrode',
            status: 'OK',
            value: null
          },
          {
            check_id: 2,
            title: 'Inspect Flame Sensor',
            status: 'OK',
            value: null
          },
          {
            check_id: 3,
            title:
              'Inspect control panel for loose connnections; check all terminals/connetions',
            status: 'OK',
            value: null
          },
          {
            check_id: 4,
            title: 'Inspect mechanical float switch',
            status: 'OK',
            value: null
          },
          {
            check_id: 5,
            title: 'Clean water pump strainer',
            status: 'OK',
            value: null
          },
          {
            check_id: 6,
            title: 'Record the running current of the pump',
            status: 'OK',
            value: 4.3
          },
          {
            check_id: 7,
            title: 'Record the running current of the blower motor',
            status: 'OK',
            value: 1.23
          },
          {
            check_id: 8,
            title: 'Record running hours',
            status: 'OK',
            value: 21345
          }
        ]
      },
      {
        id: 2,
        date: new Date(2019, 11, 30, 16, 31),
        machine_name: 'Boiler',
        technician_name: 'A.Brown',
        supervisor: 'A.Simpson',
        start_time: '',
        completion_time: '',
        responses: [
          {
            check_id: 1,
            title: 'Inspect Ignition electrode2',
            status: 'OK',
            value: null
          },
          {
            check_id: 2,
            title: 'Inspect Flame Sensor2',
            status: 'OK',
            value: null
          },
          {
            check_id: 3,
            title:
              'Inspect control panel for loose connnections; check all terminals/connetions',
            status: 'OK',
            value: null
          },
          {
            check_id: 4,
            title: 'Inspect mechanical float switch',
            status: 'OK',
            value: null
          },
          {
            check_id: 5,
            title: 'Clean water pump strainer',
            status: 'OK',
            value: null
          },
          {
            check_id: 6,
            title: 'Record the running current of the pump',
            status: 'OK',
            value: 5
          },
          {
            check_id: 7,
            title: 'Record the running current of the blower motor',
            status: 'OK',
            value: 1.9
          },
          {
            check_id: 8,
            title: 'Record running hours',
            status: 'OK',
            value: 29345
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Bi-weekly Batch Mixer PM Checksheet',
    machine_name: 'Batch Mixer',
    // technician_name: '',
    // supervisor: '',
    //date: new Date(2019, 11, 24, 13, 11),
    //start_time: '',
    WO_number: '002',
    frequency: 'bi - weekly',

    checks: [
      {
        id: 1,
        title: 'Inspect safety switch',
        status: 'NOT_OK',
        value: null
      },
      {
        id: 2,
        title: 'Inspect UPS in control panel',
        status: 'NOT_OK',
        value: null
      },
      {
        id: 3,
        title:
          'Inspect control panel for loose connnections; check all terminals/connetions',
        status: 'NOT_OK',
        value: null
      },
      {
        id: 4,
        title: 'Inspect mechanical float switch',
        status: 'NOT_OK',
        value: null
      },
      {
        id: 5,
        title: 'CHECK ALL INDICATOR LIGHTS',
        status: 'NOT_OK',
        value: null
      },
      {
        id: 6,
        title: 'Record the running current of the pump',
        status: 'NOT_OK',
        value: null
      },
      {
        id: 7,
        title: 'Record the running Agitator motor',
        status: 'NOT_OK',
        value: null
      },
      {
        id: 8,
        title: 'Record running hours',
        status: 'NOT_OK',
        value: null
      }
    ],
    response: [
      {
        id: 1,
        date: new Date(2020, 1, 24, 13, 11),
        machine_name: 'Boiler',
        technician_name: 'A.Brown',
        supervisor: 'A.Simpson',
        start_time: '',
        completion_time: '',
        responses: [
          {
            title: 'Inspect safety switch',
            status: 'OK',
            value: null
          },
          {
            title: 'Inspect UPS in control panel',
            status: 'OK',
            value: null
          },
          {
            title:
              'Inspect control panel for loose connnections; check all terminals/connetions',
            status: 'OK',
            value: null
          },
          {
            title: 'Inspect mechanical float switch',
            status: 'OK',
            value: null
          },
          {
            title: 'CHECK ALL INDICATOR LIGHTS',
            status: 'OK',
            value: null
          },
          {
            title: 'Record the running current of the pump',
            status: 'OK',
            value: 2.5
          },
          {
            title: 'Record the running Agitator motor',
            status: 'OK',
            value: 7.9
          },
          {
            title: 'Record running hours',
            status: 'OK',
            value: 21345
          }
        ]
      }
    ]
  }
];
