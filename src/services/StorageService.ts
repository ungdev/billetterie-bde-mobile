import { Injectable } from '@angular/core'

@Injectable()
export class StorageService {
  
    constructor () {
    }

    getTickets() {
      let tickets = JSON.parse(localStorage.getItem('tickets'))
      return tickets ? tickets : []
    }

    addTicket(ticket) {
      let tickets = this.getTickets()
      tickets.push(ticket)
      this.saveTickets(tickets)
    }

    removeTicket(ticket) {
      let tickets = this.getTickets()
      let index = tickets.findIndex(e => {
        return ticket.id === e.id
      })
      tickets.splice(index, 1)
      this.saveTickets(tickets)
    }
    saveTickets(tickets) {
      localStorage.setItem('tickets', JSON.stringify(tickets))
    }

    setPrices(prices) {
      localStorage.setItem('prices', JSON.stringify(prices))
    }

    getPrices() {
      let prices = JSON.parse(localStorage.getItem('prices'))
      return prices ? prices : []
    }

    setBuyer(buyer) {
      localStorage.setItem('buyer', JSON.stringify(buyer))
    }

    getBuyer() {
      let buyer = JSON.parse(localStorage.getItem('buyer'))
      return buyer ? buyer : { name: '', firstName: '', mail: '' }
    }

    getCartTickets() {
      let tickets = JSON.parse(localStorage.getItem('cartTickets'))
      return tickets ? tickets : []
    }

    addCartTicket(ticket) {
      let tickets = this.getCartTickets()
      tickets.push(ticket)
      this.saveCartTickets(tickets)
    }

    removeCartTicket(ticket) {
      let tickets = this.getCartTickets()
      let index = tickets.findIndex(e => {
        return ticket.id === e.id
      })
      tickets.splice(index, 1)
      this.saveCartTickets(tickets)
    }
    saveCartTickets(tickets) {
      localStorage.setItem('cartTickets', JSON.stringify(tickets))
    }

    clearCartTickets() {
      localStorage.setItem('cartTickets', JSON.stringify([]))
    }


}
