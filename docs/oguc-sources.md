# Fuentes OGUC del pack `cl-oguc` (región `cl`)

Este archivo respalda cada regla de `packages/core/rules/cl.json`. Un test (`packages/core/rules/__tests__/cl.test.ts`) exige que los IDs de la tabla coincidan exactamente con los del JSON.

## Documento consultado

| Campo | Valor |
|---|---|
| Documento | Ordenanza General de Urbanismo y Construcciones (OGUC), D.S. N°47/1992, Ministerio de Vivienda y Urbanismo (MINVU) |
| Versión | Texto actualizado por D.S. N°5, D.O. 22-05-2026 (según la página del MINVU; el PDF se llama `…rev-15.09.2026`). Las páginas citadas (Título 4, Cap. 1) llevan el pie «ARQ. 1-2, NOVIEMBRE 2025» |
| URL oficial | https://www.minvu.gob.cl/elementos-tecnicos/decretos/d-s-n47-1992-ordenanza-general-de-urbanismo-y-construccione/ |
| PDF | https://www.minvu.gob.cl/wp-content/uploads/2019/05/OGUC-Mayo-2026-D.S.-N5-D.O.-22-05-2026-rev-15.09.2026.pdf |
| Fecha de consulta | 2026-10-11 |
| Otras fuentes | LeyChile (bcn.cl) no cargó sin JavaScript al consultarla: pendiente de que el usuario coteje. modulor.cl (reproducción no oficial, «sincronizado con BCN») y la circular MINVU DDU 503 sirvieron solo para ubicar los artículos |

## Dos cosas distintas

- **Verificación documental** (`source.verified` en `cl.json`): ¿la cita y el número corresponden al texto oficial? Una regla queda en `verified: false` hasta que **el usuario** la revise y la cambie a `true`. El 2026-10-11 el usuario validó `CL-ALT-01`, `CL-VEN-01` y `CL-CIP-*`; `CL-VEN-02` (planned) sigue pendiente. El asistente cotejó las citas de abajo contra el PDF oficial (extracción del texto), pero eso no reemplaza la validación del usuario.
- **Resultado del proyecto** (salida de `validate`): ¿el modelo cumple la regla? Hay tres resultados:
  - **Incumple:** issue `error` de `CL-ALT-01` o `CL-VEN-01`.
  - **Indeterminado:** issue `info` de `CL-INDET`, con el motivo. Nunca se declara cumplimiento por defecto.
  - **Sin hallazgo:** se evaluó con los datos del modelo y no se detectó incumplimiento. **No equivale a cumplimiento legal**: el modelo es un anteproyecto y los evaluadores simplifican el texto (ver la columna «Cómo se evalúa»).

## Reglas

| ID | Estado | Artículo | Cita textual (PDF MINVU) | Aplicabilidad | Evaluación en el modelo | Revisión documental |
|---|---|---|---|---|---|---|
| `CL-ALT-01` | activa (`error`) | 4.1.1 | «Los locales habitables tendrán una altura mínima de piso a cielo, medida en obra terminada, de 2,30 m, salvo bajo pasadas de vigas, instalaciones horizontales, y áreas menores de recintos ubicados directamente bajo techumbres inclinadas.» Exceptuados: «los recintos de cualquier tipo destinados a bodega o instalación de maquinaria y los lugares de registro o mantención de instalaciones». | Edificaciones o partes destinadas a vivienda, hospedaje, oficinas y comercio; solo locales habitables | `clearHeight` (altura de piso − espesor de la losa superior) ≥ `params.min` = 2300 mm en recintos habitables. Indeterminado si el uso es ambiguo (`bep-an`, `tho`) o si falta el piso o la losa superior. **No modela** «obra terminada» ni las excepciones (vigas, techumbre inclinada); en el último piso usa la altura del piso | Cotejada por el asistente contra el PDF oficial · **validada por el usuario** contra el PDF oficial (2026-10-11, `verified: true`) |
| `CL-VEN-01` | activa (`error`) | 4.1.2 | «Los locales habitables deberán tener, al menos, una ventana que permita la entrada de aire y luz del exterior» | Locales habitables. El mismo artículo admite ventanas fijas selladas con ductos o climatización, salvo en dormitorios | Cada recinto habitable tiene ≥1 ventana cuyo otro lado es exterior del deslinde, patio dentro del sitio o patio de luz (`gieng-troi`). La luz por el vano de la escalera **no** cuenta. Indeterminado si el uso es ambiguo. **No distingue** ventanas fijas de practicables | Cotejada por el asistente contra el PDF oficial · **validada por el usuario** contra el PDF oficial (2026-10-11, `verified: true`) |
| `CL-VEN-02` | `planned` (no se ejecuta) | 4.1.2 | «…con una distancia mínima libre horizontal de 1,5 m medida en forma perpendicular a la ventana cuando se trate de dormitorios.» | Ventanas de dormitorios | **No se evalúa:** el modelo no tiene datos de construcciones vecinas para medir la distancia libre. Queda definida (`params.min` = 1500) para una versión futura | Cotejada por el asistente contra el PDF oficial · **pendiente de validación del usuario** |
| `CL-INDET` | activa (`info`), sin evaluador propio | — | (regla de estado, no normativa) | Cualquier regla `CL-*` que no se pueda evaluar | Lo emiten los evaluadores `CL-*` con `{regla, ten, room, motivo}` | No aplica |
| `CL-CIP-ANT` | activa (`error`), pack `cl-cip` | 1.4.4 n°5 f) | «f) Adosamientos, distanciamientos, antejardines, ochavos y rasantes.» | Predio con CIP | Muros a menos del antejardín declarado del deslinde frontal (reutiliza `PLN-01`). Dato: `brief.dat.quy_hoach.khoang_lui_truoc` o `site.setbacks.front`. Sin dato → indeterminado | Cotejada por el asistente contra el PDF oficial · **validada por el usuario** contra el PDF oficial (2026-10-11, `verified: true`) |
| `CL-CIP-FON` | activa (`error`), pack `cl-cip` | 1.4.4 n°5 f) | (misma letra f) | Predio con CIP | Muros a menos del distanciamiento declarado del deslinde de fondo (reutiliza `PLN-02`). Dato: `khoang_lui_sau` o `site.setbacks.back`. **No** calcula distanciamientos por altura ni rasantes. Sin dato → indeterminado | Cotejada por el asistente contra el PDF oficial · **validada por el usuario** contra el PDF oficial (2026-10-11, `verified: true`) |
| `CL-CIP-COS` | activa (`error`), pack `cl-cip` | 1.4.4 n°5 d) | «d) Coeficiente de ocupación del suelo.» | Predio con CIP | Losa del primer piso / superficie del sitio ≤ valor declarado en % (reutiliza `PLN-03`; un coeficiente 0,6 se declara como 60). Dato: `mat_do_max`. Sin dato o sin losa del primer piso → indeterminado | Cotejada por el asistente contra el PDF oficial · **validada por el usuario** contra el PDF oficial (2026-10-11, `verified: true`) |
| `CL-CIP-PIS` | activa (`error`), pack `cl-cip` | 1.4.4 n°5 e) | «e) Alturas de edificación expresadas en metros o número de pisos.» | Predio con CIP | Número de pisos del modelo ≤ el declarado (reutiliza `PLN-04`). Dato: `tang_max`. Sin dato → indeterminado | Cotejada por el asistente contra el PDF oficial · **validada por el usuario** contra el PDF oficial (2026-10-11, `verified: true`) |
| `CL-CIP-ALT` | activa (`error`), pack `cl-cip` | 1.4.4 n°5 e) | (misma letra e) | Predio con CIP | Cota superior de la edificación ≤ altura declarada en mm (reutiliza `PLN-05`). Dato: `chieu_cao_max`. Sin dato → indeterminado | Cotejada por el asistente contra el PDF oficial · **validada por el usuario** contra el PDF oficial (2026-10-11, `verified: true`) |
| `CL-CIP-DIS` | activa (`error`), pack `cl-cip` | 1.4.4 n°5 f) | (misma letra f) | Predio con CIP | Muros a menos del distanciamiento declarado para cada deslinde (reutiliza `PLN-07`). Dato: `site.edges[i].setback`. **No** calcula rasantes ni adosamientos. Sin dato → indeterminado | Cotejada por el asistente contra el PDF oficial · **validada por el usuario** contra el PDF oficial (2026-10-11, `verified: true`) |

### Clasificación de recintos (OGUC 4.1.1)

Cita: «Locales habitables: los destinados a la permanencia de personas, tales como: dormitorios o habitaciones, comedores, salas de estar, oficinas, consultorios, salas de reunión y salas de venta.» / «Locales no habitables: los destinados al tránsito o estadía esporádica de personas, tales como cuartos de baño, cocinas, salas de vestir, lavaderos, vestíbulos, galerías o pasillos.»

| `Room.use` del modelo | Clasificación |
|---|---|
| `ngu` (dormitorio), `khach` (estar), `lam-viec` (estudio/oficina) | habitable |
| `wc`, `hanh-lang`, `kho`, `cau-thang`, `gara`, `san`, `gieng-troi`, `ban-cong` | no habitable o exceptuado |
| `bep-an` (cocina + comedor en un solo recinto), `tho` (sala de altar del upstream) | **ambiguo → indeterminado** |

### Pack `cl-cip`: de dónde salen los valores

La OGUC no fija estos números: los fija el **instrumento de planificación territorial** de cada comuna, y el **Certificado de Informaciones Previas (CIP)** del predio los informa. Art. 1.4.4 (PDF oficial): la DOM «emitirá […] un Certificado de Informaciones Previas, que contenga las condiciones aplicables al predio de que se trate, de acuerdo con las normas urbanísticas derivadas del Instrumento de Planificación Territorial respectivo». El numeral 5 enumera las «Normas Urbanísticas aplicables al predio», entre ellas las letras d), e) y f) citadas en la tabla.

Por eso las reglas `CL-CIP-*` **comparan el modelo contra los valores que el usuario declara desde su CIP**: no traen números propios. Si un valor no se declaró, el resultado es **indeterminado** (`CL-INDET`), nunca «cumple». Reutilizan los evaluadores `PLN-*` del upstream y sus claves de datos (`brief.dat.quy_hoach.*`, `site.edges[].setback`).

### Viñeta de las láminas (no es una regla)

La OGUC **no fija un formato de viñeta**: el formato concreto (rol, dirección, comuna, etc.) lo pide cada DOM. Lo que sí dice, cotejado contra el PDF oficial:

- Art. 1.2.2: «Los planos, especificaciones técnicas y demás documentos técnicos de los anteproyectos y proyectos deberán ser firmados por el o los profesionales competentes que los hubieren elaborado y por el propietario».
- Art. 5.1.6 n°7: «Planos de arquitectura numerados».

Por eso la viñeta de `export` lleva lámina numerada (`ARQ-NN`), contenido, escala, fecha, líneas de firma para el arquitecto y el propietario, y la nota «Anteproyecto de referencia: no reemplaza los planos firmados por el arquitecto y el propietario (OGUC art. 1.2.2)». No se evalúa como regla ni tiene `verified`.

## Temas pendientes sin fuente verificada (no codificados)

No se encontró ni se cotejó un texto oficial aplicable a viviendas para estos temas, así que **no hay reglas** para ellos:

- Escaleras en vivienda (huella, contrahuella, ancho).
- Puertas, pasillos y accesibilidad universal en vivienda.
- Rasantes, adosamientos, ochavos y coeficiente de constructibilidad: además de la OGUC (art. 2.6.3 y siguientes), dependen del instrumento de planificación; no están modelados. Antejardín, distanciamientos declarados, ocupación y alturas sí están cubiertos por `cl-cip` con valores del CIP.
- Ventilación de baños y cocinas por ducto (art. 4.1.3): el texto se ubicó, pero el modelo no representa ductos.

## Cómo validar (usuario)

1. Abrir el PDF oficial (o LeyChile) en el Título 4, Capítulo 1, y comparar cada cita de la tabla.
2. Si coincide, cambiar `"verified": false` → `true` en esa regla de `cl.json` y registrar la fecha y el resultado en la columna «Revisión documental».
3. Ejecutar `pnpm test` (el test de correspondencia sigue exigiendo que cada ID esté en esta tabla).
