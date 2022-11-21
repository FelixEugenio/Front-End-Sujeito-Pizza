import { canSSRAuth } from '../../utils/canSSRAuth'
import { useState } from 'react';
import Head from 'next/head';
import styles from './styles.module.scss'
import { FiRefreshCcw } from 'react-icons/fi';
import { setupAPIClient } from '../../services/api';

import { Header } from '../../components/Header'


type OrdersProps = {
  id:string;
  table:string | number;
  status:boolean;
  draft:boolean;
  name:string | null;
}

interface HomeOrders {
  orders: OrdersProps[];
}

export default function Dashboard({orders}:HomeOrders){

  const [orderList,setOrderList] = useState(orders || []);
  return(
    <>
    <Head>
      <title>Painel - Sujeito Pizzaria</title>
    </Head>
    <div>
      <Header/>
    
    <main className={styles.container}>
      <div className={styles.containerHeader}>
        <h1>Ultimos Pedidos</h1>

        <button>
        <FiRefreshCcw size={25} color="#3fffa3" />
        </button>

      </div>

      <article className={styles.listOrders}>
        {orderList.map(item =>(
          <section key={item.id} className={styles.orderItem}>
          <button>
            <div className={styles.tag}>
            </div>
            <span>Mesa {item.table}</span>
          </button>
        </section>
        ))}
        

        

      </article>

    </main>
    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  const apiClient = setupAPIClient(ctx);

  const response = apiClient.get('/orders')

 // console.log(((await response).data))

  return {
    props: {
      orders: (await response).data,
    }
  }
})