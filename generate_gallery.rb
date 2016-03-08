photos = Dir.entries("gallery")

# Rename files with spaces
photos.each do |photo|
  if photo.include?(' ')
    File.rename("gallery/#{photo}", "gallery/#{photo.gsub(' ','')}")
  end
end

photos = Dir.entries("gallery")

# Replace JPG with jpg
photos.each do |photo|
  if photo.include?('JPG')
    File.rename("gallery/#{photo}", "gallery/#{photo.gsub('JPG','jpg')}")
  end
end

# Empty thumbs
`rm -r ./assets/img/gallery/small/*.jpg`
# Create thumbs
`mogrify -path assets/img/gallery/small -format jpg -resize "240x180^" -gravity center -quality 90 -crop 240x180+0+0 +repage ./gallery/*.jpg`

# Empty big
`rm -r ./assets/img/gallery/big/*.jpg`
# Resize 
`mogrify -path assets/img/gallery/big -format jpg -resize "1024x768^" -gravity center -quality 90 -crop 1024x768+0+0 +repage ./gallery/*.jpg`

photos = Dir.entries("gallery") - [".", "..", ".DS_Store"]

File.open("./_includes/sections/gallery_content.html", 'w') {|f| 
  f.write('<div id="lightgallery" class="carousel slide">
  <div class="carousel-inner">')
  photos.each_slice(12).with_index do |slice, index|
    # create item div
    f.write("
    <div class=\"item #{'active' if index == 0}\">")

    slice.each_slice(4) do |row_items|
      # create row div
      f.write('
      <div class="row">')

      # write span with photo
      row_items.each do |photo|
        f.write("
        <div class=\"span3\">
          <a href=\"assets/img/gallery/big/#{photo}\">
            <img class=\"lazy\" data-original=\"assets/img/gallery/small/#{photo}\" width=\"240\" height=\"180\">
          </a>
        </div>")
      end

      f.write('
      </div>')
    end
    f.write('
    </div>')
  end

  f.write('
  </div>')

  f.write('
  <div class="carousel-indicators-wrapper">
    <ol class="carousel-indicators">')

  (0..photos.count / 12).each do |i|
    f.write("
      <li data-slide-to=\"#{i}\" class=\"#{'active' if i == 0}\"></li>")
  end
  
  f.write('
    </ol>
  </div>
</div>')

}