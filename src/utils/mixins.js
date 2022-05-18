import moment from 'moment'
moment.locale('zh-tw');

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    },
    ampm(datetime) {
      return datetime ? moment(datetime).format(' A hh:mm ・ YYYY年MM月DD日') : '-'
    },

  }
}


export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
    }
  }
}