import React from 'react'
import { ArrowRight, ArrowLeft, Clock, TicketCheck, CheckCircle } from 'lucide-react'


const RecipeDetails = () => {
  return (
    <div className='w-screen border-4 border-red-600 lg:flex items-center justify-center bg-gray-200 lg:h-screen'>




      <div className='main h-full w-full lg:w-4xl lg:h-fit lg:max-h-4/5 bg-white p-3 overflow-scroll lg:p-8 rounded-2xl'>

        <div className='flex justify-between items-center mb-6 sticky top-0 py-2 bg-white lg:hidden'>
          <button className='w-6'>
            <ArrowLeft />
          </button>

          <span className='text-xl'>
            Recipe Details
          </span>

          <span className='w-6'></span>
        </div>


        <div className=''>
          <div className='h-48 w-full border border-green-500 rounded-2xl'></div>

          <p className='text-3xl'>Ofada Rice with Ayamase Stew</p>
          <span className='text-sm text-gray-600'>Serves 4 - 6 People</span>
          <div className='flex items-center gap-2'>
            <Clock size={15} color='orange' />
            <span className='text-sm text-gray-600'>Ready in: 1h 45 min</span>
          </div>


          <div>
            <p className='text-orange-600'>Ingredients</p>

            {/* INGREDIENTS LIST */}

            <div className='mb-6'>

              <div className='flex border-b-2 mb-3 items-center justify-between py-3 gap-3 text-sm'>
                <span className='flex-1'>Green ball peppers</span>

                <span className='text-gray-600 flex-1'>8 - 10 (large)</span>

                <CheckCircle size={15} className='text-green-600' />
              </div>
              <div className='flex border-b-2 mb-3 items-center justify-between py-3 gap-3 text-sm'>
                <span className='flex-1'>Green ball peppers</span>

                <span className='text-gray-600 flex-1'>8 - 10 (large)</span>

                <CheckCircle size={15} className='text-green-600' />
              </div>
              <div className='flex border-b-2 mb-3 items-center justify-between py-3 gap-3 text-sm'>
                <span className='flex-1'>Green ball peppers</span>

                <span className='text-gray-600 flex-1'>8 - 10 (large)</span>

                <CheckCircle size={15} className='text-green-600' />
              </div>


            </div>



            <p className='text-orange-600'>Preparation Instructions</p>
            <div className='mb-6'>
              <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quas, itaque accusamus nemo magni maiores facilis at ipsam fugiat officiis facere blanditiis aperiam asperiores pariatur. Voluptate laudantium et illo doloremque? Neque suscipit voluptatem aspernatur, illo labore eligendi praesentium cum doloribus harum beatae excepturi recusandae dolore hic itaque sint maxime quas accusamus ipsam eum. Magnam possimus sit, saepe, ipsa quae dolores nihil repellat vero expedita, provident porro voluptatibus dignissimos quos accusamus nemo. Sequi quas ab ratione veniam tenetur rerum nulla, laboriosam dolor fugit, animi ex aliquam inventore? Esse tenetur, officia quia culpa tempora facilis sed magni adipisci cum doloremque ea, nostrum dolore veniam? Quis porro rerum vel aut impedit eius dolores perferendis blanditiis ex, omnis, odit doloremque, facere inventore! Expedita facilis, harum eaque et porro sed, ipsam culpa repellat fugiat, reprehenderit corporis a itaque cupiditate aperiam! Facilis ipsam eligendi non incidunt temporibus dolores! In quia doloribus assumenda ad voluptatibus fugit facilis libero earum aperiam hic, obcaecati explicabo soluta. In molestias expedita, aperiam magni consequatur ea sapiente excepturi quaerat minima dolor ad libero, modi nesciunt consectetur consequuntur iusto nisi natus aspernatur eveniet. Fugiat minima odio, numquam iure ea sit molestias nemo minus atque unde sapiente tempore ut, quasi laudantium error sunt quaerat, ad sint obcaecati voluptate. Ut sequi rerum consectetur inventore, atque in deserunt accusantium voluptate eveniet soluta excepturi molestiae autem, commodi eaque doloribus! Voluptates ab architecto doloremque ea cum labore sapiente dolores facilis exercitationem, possimus magni quasi accusamus eum iusto rerum nihil, provident impedit ullam praesentium vero eius, voluptate cumque! Possimus perferendis, impedit quod cum vel sit nulla optio obcaecati laborum ullam. Architecto, odit inventore. Odio ex debitis iure. Eos, accusantium obcaecati. Deserunt incidunt iste, repellendus alias libero amet iure repellat, molestiae dolorem quae odio atque tenetur, sed at hic nobis itaque corrupti laborum? Molestias ipsum eaque hic. Eveniet, reprehenderit unde? Repudiandae magni id ratione hic aspernatur accusamus vitae consectetur quasi facilis ullam minima aliquam ea expedita, culpa saepe ab enim modi provident cum dolores nam possimus dicta et. Autem doloribus incidunt quibusdam modi aspernatur commodi optio quam, qui, blanditiis dolorum architecto quisquam libero magnam iusto neque mollitia velit nihil iure hic? Quisquam enim odio quod obcaecati, iusto asperiores esse quia earum? Deserunt assumenda modi sunt! Nisi id ad expedita quas consectetur laborum, voluptate similique placeat repellendus adipisci reiciendis minima dolorum sint mollitia hic deserunt maiores eius qui illum vero sapiente explicabo! Cupiditate at nostrum ipsum, dolores totam perferendis deserunt, soluta quibusdam tenetur beatae recusandae velit sequi quos! Quas iste saepe fugit. Possimus sed quo dolores tenetur reiciendis alias tempora. Voluptatibus vitae perspiciatis hic labore tempore deleniti error atque assumenda non aspernatur corporis minima, ex reiciendis minus mollitia fugiat quos, quam aperiam iure expedita, nam similique sapiente veniam impedit. Itaque quibusdam quisquam enim ea eos quis praesentium eius distinctio illum magnam maiores, est adipisci ducimus? Quibusdam nemo iure minus exercitationem enim asperiores minima reprehenderit facere nam hic fuga perspiciatis repellat voluptates, odio saepe fugiat laborum repudiandae amet, quis dolores a voluptatem, ipsum in architecto. Accusamus ut earum, ipsa nobis iusto sit.
              </p>
            </div>

            <button className='bg-green-500 text-white py-3 px-10 rounded-full w-full mb-3'>
              Officially Cooked
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default RecipeDetails