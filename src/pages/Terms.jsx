
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';

const Terms = () => {
  return (
    <PageLayout>
      <section className="pt-12 pb-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Términos y Condiciones</h1>
            <p className="text-lg text-gray-600">Última actualización: 1 de junio de 2023</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introducción</h2>
              <p className="mb-4">
                Bienvenido a Avatar Shop. Estos Términos y Condiciones rigen tu uso de nuestro sitio web y servicios.
                Al acceder o utilizar nuestro sitio web, aceptas cumplir y quedar vinculado por estos Términos. Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder al sitio web ni utilizar nuestros servicios.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Uso del Servicio</h2>
              <p className="mb-4">
                Nuestro servicio permite a los usuarios crear avatares digitales personalizados y probar prendas de vestir virtualmente. Para utilizar ciertas funciones de nuestro sitio web, es posible que debas crear una cuenta y proporcionar información precisa y completa.
              </p>
              <p className="mb-4">
                Eres responsable de mantener la confidencialidad de tu cuenta y contraseña, y aceptas la responsabilidad de todas las actividades que ocurran bajo tu cuenta. Debes notificarnos inmediatamente de cualquier uso no autorizado de tu cuenta o cualquier otra violación de seguridad.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Avatares Digitales y Contenido del Usuario</h2>
              <p className="mb-4">
                Al crear un avatar digital en nuestra plataforma, conservas todos los derechos sobre tu avatar personalizado. Sin embargo, nos otorgas una licencia mundial, no exclusiva, libre de regalías para usar, reproducir, modificar, adaptar, publicar, traducir y mostrar dicho contenido en relación con la prestación de nuestros servicios.
              </p>
              <p className="mb-4">
                Te comprometes a no utilizar nuestro servicio para crear contenido que sea ilegal, ofensivo, difamatorio, obsceno o que viole los derechos de propiedad intelectual de terceros.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Compras y Pagos</h2>
              <p className="mb-4">
                Al realizar una compra a través de nuestro sitio web, aceptas proporcionar información de pago precisa y actualizada. Nos reservamos el derecho de rechazar o cancelar tu pedido en cualquier momento por motivos como disponibilidad del producto, errores en la descripción o precio del producto, o error en tu pedido.
              </p>
              <p className="mb-4">
                Todos los precios mostrados están en la moneda indicada y no incluyen impuestos o gastos de envío, a menos que se indique lo contrario. Nos reservamos el derecho de modificar los precios en cualquier momento.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Privacidad</h2>
              <p className="mb-4">
                Tu privacidad es importante para nosotros. Consulta nuestra Política de Privacidad para obtener información sobre cómo recopilamos, utilizamos y compartimos tu información personal.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Cambios en los Términos</h2>
              <p className="mb-4">
                Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en cualquier momento. Si hacemos cambios materiales en estos Términos, te notificaremos mediante un aviso prominente en nuestro sitio web o por correo electrónico. Tu uso continuado del sitio web después de dichos cambios constituye tu aceptación de los nuevos Términos.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Contacto</h2>
              <p className="mb-4">
                Si tienes alguna pregunta sobre estos Términos, por favor contáctanos a través de la sección de contacto en nuestro sitio web o enviando un correo electrónico a info@avatarshop.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Terms;
