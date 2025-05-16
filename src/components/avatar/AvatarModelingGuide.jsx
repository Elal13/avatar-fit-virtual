
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AvatarModelingGuide() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Guía para preparar modelos 3D con skinning</CardTitle>
          <CardDescription>
            Cómo preparar modelos de avatar y ropa para usarlos con el sistema de Avatar Virtual
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <section>
            <h3 className="text-lg font-medium mb-2">1. Creación del modelo base</h3>
            <p className="text-gray-600">
              El avatar base debe tener un esqueleto (armature) con los siguientes huesos principales:
            </p>
            <ul className="list-disc pl-5 my-2 space-y-1 text-gray-600">
              <li>Root</li>
              <li>Hips</li>
              <li>Spine</li>
              <li>Spine1</li>
              <li>Spine2</li>
              <li>Neck</li>
              <li>Head</li>
              <li>LeftShoulder/RightShoulder</li>
              <li>LeftArm/RightArm</li>
              <li>LeftForeArm/RightForeArm</li>
              <li>LeftHand/RightHand</li>
              <li>LeftUpLeg/RightUpLeg</li>
              <li>LeftLeg/RightLeg</li>
              <li>LeftFoot/RightFoot</li>
            </ul>
            <p className="text-gray-600">
              La estructura debe ser compatible con el formato Mixamo para facilitar la animación.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">2. Weight Painting</h3>
            <p className="text-gray-600">
              Para el avatar y cada prenda, es necesario establecer correctamente el "weight painting":
            </p>
            <ol className="list-decimal pl-5 my-2 space-y-2 text-gray-600">
              <li>
                <strong>Selecciona el modelo</strong> y luego el armature en modo Object.
              </li>
              <li>
                Presiona <code className="bg-gray-100 px-1 rounded">Ctrl+Tab</code> y selecciona "Weight Paint".
              </li>
              <li>
                Selecciona un hueso del esqueleto para ver/editar su influencia.
              </li>
              <li>
                Usa el pincel para pintar los pesos (rojo = influencia máxima, azul = sin influencia).
              </li>
              <li>
                Asegúrate de que las transiciones entre áreas de influencia sean suaves para evitar deformaciones extrañas.
              </li>
            </ol>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">3. Preparación de prendas</h3>
            <p className="text-gray-600">
              Las prendas deben seguir estas pautas:
            </p>
            <ul className="list-disc pl-5 my-2 space-y-1 text-gray-600">
              <li>Modela la prenda alrededor del avatar base</li>
              <li>Asegúrate de que la geometría no penetre en el cuerpo</li>
              <li>Aplica el mismo armature a la prenda con <code className="bg-gray-100 px-1 rounded">Ctrl+P</code> → "With Automatic Weights"</li>
              <li>Ajusta los pesos manualmente según sea necesario</li>
              <li>Comprueba la deformación moviendo los huesos en modo Pose</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">4. Exportación a glTF</h3>
            <p className="text-gray-600">
              Para exportar correctamente:
            </p>
            <ol className="list-decimal pl-5 my-2 space-y-1 text-gray-600">
              <li>Selecciona el avatar y su esqueleto</li>
              <li>Exporta como glTF 2.0 (.glb)</li>
              <li>Activa las opciones: +Y up, Apply Transform, Export Animations</li>
              <li>Incluye: Skinning, Baked Animation</li>
              <li>Para las prendas, exporta cada una como un archivo glTF separado</li>
            </ol>
          </section>

          <Alert className="mt-6">
            <AlertTitle>Importante</AlertTitle>
            <AlertDescription>
              Todos los modelos deben tener la misma estructura de esqueleto y nombres de huesos idénticos para que el sistema de skinning compartido funcione correctamente.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
