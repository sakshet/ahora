import { colors } from "@Core/styles";
import { OrgChartOptions } from "./types";

const mgmtRoles: OrgChartOptions = {
  id: '8',
  title: 'Roles',
  isGroup: true,
  style: {
    backgroundColor: colors.blue060,
    color: colors.white,
  },
  children: [
    {
      title: 'Role 1',
      id: '9',
      style: {
        backgroundColor: colors.gray060,
        color: colors.white,
      },
      children: [
        { id: '10', title: 'Employee 1' },
        { id: '11', title: 'Employee 2' },
        { id: '12', title: 'Employee 3' },
      ],
    },
    {
      id: '13',
      title: 'Role 2',
      style: {
        backgroundColor: colors.gray060,
        color: colors.white,
      },
      children: [
        { id: '80', title: 'Employee 1' },
        { id: '14', title: 'Employee 4' },
      ],
    },
    {
      id: '15',
      title: 'Role 3',
      style: {
        backgroundColor: colors.gray060,
        color: colors.white,
      },
      children: [
        {
          id: '16',
          title: 'Entity 1',
          children: [
            {
              id: '17',
              title: 'Roles 3',
              style: {
                backgroundColor: colors.gray060,
                color: colors.white,
              },
              children: [
                { id: '18', title: 'Entity 1' },
                { id: '19', title: 'Entity 2' },
                { id: '20', title: 'Entity 3' },
              ]
            }
          ]
        },
        {
          id: '22',
          title: 'Entity 2',
          children: [
            {
              id: '17',
              title: 'Roles 3',
              style: {
                backgroundColor: colors.gray060,
                color: colors.white,
              },
              children: [
                { id: '26', title: 'Entity 1' },
                { id: '27', title: 'Entity 2' },
                { id: '28', title: 'Entity 3' },
              ]
            }
          ]
        },
        { id: '24', title: 'Employee 3' },
        { id: '25', title: 'Employee 5' }
      ],
    }
  ]
};

const mgmtRoles1: OrgChartOptions = {
  ...JSON.parse(JSON.stringify(mgmtRoles)),
  collapsed: true,
};
const mgmtRoles2: OrgChartOptions = {
  ...JSON.parse(JSON.stringify(mgmtRoles)),
  collapsed: true,
};
const mgmtRoles3: OrgChartOptions = {
  ...JSON.parse(JSON.stringify(mgmtRoles)),
  collapsed: true,
};
const mgmtRoles4: OrgChartOptions = {
  ...JSON.parse(JSON.stringify(mgmtRoles)),
  collapsed: true,
};

export const mockOptions: OrgChartOptions = {
  id: '1',
  isGroup: true,
  title: 'abc',
  children: [
    {
      id: '2',
      title: 'def',
    },
    {
      id: '3',
      title: 'ghi',
    }
  ]
}

export const mockOptions2: OrgChartOptions = {
  id: '1',
  isGroup: true,
  title: 'Main Entity',
  subTitle: 'Sub Entity',
  children: [
    {
      id: '2',
      title: 'Entities',
      style: {
        backgroundColor: colors.gray100,
        color: colors.white,
      },
      children: [
        {
          id: '4',
          title: 'Entity 121',
          children: [mgmtRoles1],
        },

        {
          id: '5',
          title: 'Entity 121',
          children: [mgmtRoles2],
        },

        {
          id: '6',
          title: 'Entity 121',
          children: [mgmtRoles3],
        },

        {
          id: '7',
          title: 'Entity 121',
          children: [mgmtRoles4],
        }
      ]
    },
    mgmtRoles,
  ]
}