import React from 'react';
import IconChart from '@material-ui/icons/InsertChart';
import IconDoc from '@material-ui/icons/EventNote';
import IconInfo from '@material-ui/icons/Info';
import IconHelp from '@material-ui/icons/Help';
import IconPerson from '@material-ui/icons/Person';
import IconSettings from 'metadata-react/styles/Setting';
// import IconDrafts from '@material-ui/icons/Drafts';
// import IconList from '@material-ui/icons/List';

const items = [
  {
    text: 'Документы',
    icon: <IconDoc/>,
    open: true,
    id: 'docs',
    items: [
      {
        text: 'Перемещение денег',
        id: 'doc_cash_moving',
        navigate: '/doc.cash_moving/list',
        need_meta: true,
        need_user: true,
        //icon: <IconDrafts/>,
      },
    ]
  },
  {
    text: 'Отчеты',
    icon: <IconChart/>,
    open: true,
    id: 'reports',
    items: [
      {
        text: 'Движение денег',
        id: 'rep_cash_moving',
        navigate: '/rep.cash_moving/main',
        need_meta: true,
        need_user: true,
        //icon: <IconList/>,
      }
    ]
  },
  {
    divider: true,
  },
  {
    text: 'Профиль',
    navigate: '/login',
    need_meta: true,
    icon: <IconPerson/>
  },
  {
    text: 'Настройки',
    navigate: '/settings',
    need_meta: true,
    icon: <IconSettings/>,
  },
  {
    text: 'Справка',
    navigate: '/help',
    icon: <IconHelp/>
  },
  {
    text: 'О программе',
    navigate: '/about',
    icon: <IconInfo/>
  }
];

function path_ok(path, item) {
  const pos = item.navigate && item.navigate.indexOf(path);
  return pos === 0 || pos === 1;
}

function with_recursion(path, parent) {
  if(path && path != '/'){
    for(const item of parent){
      const props = item.items ? with_recursion(path, item.items) : path_ok(path, item) && item;
      if(props){
        return props;
      }
    }
  }
}

export function item_props(path) {
  if(!path){
    path = location.pathname;
  }
  if(path.endsWith('/')) {
    path = path.substr(0, path.length - 1);
  }
  // здесь можно переопределить нужность meta и авторизованности для корневой страницы
  let res = with_recursion(path, items);
  if(!res && path.indexOf('/') !== -1) {
    res = with_recursion(path.substr(0, path.lastIndexOf('/')), items);
  }
  if(!res && path.match(/\/(doc|cat|ireg|cch|rep)\./)){
    res = {need_meta: true, need_user: true};
  }
  return res || {};
}

export default items;
